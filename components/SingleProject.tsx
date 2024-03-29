import { useState } from 'react';

import axios from 'axios';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';

import KanbanBoard from './KanbanBoard';

import UserCard from '@/components/UserCard';
import { ProjectProps, TagProps } from '@/types';

interface SingleProjectProps {
  project: ProjectProps;
  setStageChangingFlag: () => void;
  setProject: React.Dispatch<React.SetStateAction<ProjectProps>>;
}

const SingleProject = ({
  project,
  setStageChangingFlag,
  setProject,
}: SingleProjectProps) => {
  const [projectTitle, setProjectTitle] = useState<string>(project.title);
  const token = localStorage.getItem('token');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const [newTagTitle, setNewTagTitle] = useState<string>('');
  const [newTagPriority, setNewTagPriority] = useState<number>(1);
  const [newTagColor, setNewTagColor] = useState<string>('#ffffff');

  const [isHover, setIsHover] = useState<boolean>(true);

  const handleChangeProjectTitle = (newTitle: string) => {
    setProjectTitle(newTitle);
  };

  const handleSubmitNewTitle = async () => {
    await axios
      .put(
        `${API_URL}/projects/updateTitle/${project.id}`,
        {
          title: projectTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        if (res.status === 200) {
          console.log('Project title updated successfully');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCreateTag = async (event: React.FormEvent) => {
    event.preventDefault();
    await axios
      .post(
        `${API_URL}/tags/create/${project.id}`,
        {
          title: newTagTitle,
          priority: newTagPriority,
          colour: newTagColor,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        setIsPopupOpen(false);
        setNewTagTitle('');
        setNewTagPriority(1);
        setNewTagColor('#ffffff');

        const createdTag = {
          id: res.data.tagId,
          title: newTagTitle,
          priority: newTagPriority,
          colour: newTagColor,
        } as TagProps;
        setProject(prevProject => ({
          ...prevProject,
          tags: [...prevProject.tags, createdTag],
        }));
      })
      .catch(err => {
        console.error('An error occurred while creating the tag:', err);
      });
  };

  const handleDeleteTag = async (selectedTag: string) => {
    const tagToDelete = project.tags.find(
      tag => tag && tag.title === selectedTag,
    );
    if (!tagToDelete) {
      console.error('Tag to delete not found');

      return;
    }
    const tagId = tagToDelete.id;
    await axios
      .delete(`${API_URL}/tags/delete/${tagId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          setProject(prevProject => ({
            ...prevProject,
            tags: [
              ...prevProject.tags.filter(tag => {
                return tag.id !== tagId;
              }),
            ],
          }));
        }
      })
      .catch(err => {
        console.error('An error occurred while deleting the tag:', err);
        console.log(err);
      });
  };

  return (
    <div className="w-full h-full flex flex-row justify-center items-center border-r-2">
      <div className="w-[15%] min-w-[150px] h-full flex-col items-center flex bg-neutral-300 relative justify-between py-6">
        <div className=" space-y-3 h-30 w-1/2">
          <div className="border-2 rounded-xl h-10 w-full bg-neutral-400 border-neutral-500 flex items-center justify-center">
            <p className="text-white text-xl font-Roboto font-medium">Task</p>
          </div>
          <div className="border-2 rounded-xl h-10 w-full bg-neutral-400 border-neutral-500 flex items-center justify-center">
            <p className="text-white text-xl font-Roboto font-medium">
              Timeline
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center py-2 space-y-4">
          <div className="text-2xl font-Montserrat font-semibold">
            Members ({project.members.length})
          </div>
          <div className="flex flex-col space-y-4 max-h-[300px] overflow-y-auto">
            {project.members.map((member, index) => (
              <UserCard admin={project.admin} key={index} user={member} />
            ))}
          </div>
        </div>
        <div className="w-full text-center cursor-pointer">
          <span
            className={'text-lg font-Roboto'}
            onClick={() => {
              navigator.clipboard.writeText(project.id);
            }}
          >
            Click to copy code
          </span>
          <p
            className={
              'text-sm font-Roboto font-bold truncate text-cyan-400 hover:text-cyan-500 select-all'
            }
          >
            {project.id}
          </p>
        </div>
      </div>
      <div className="flex flex-row w-full h-full overflow-x-auto overflow-y-hidden">
        <div className="w-full h-full flex flex-col">
          <div className="bg-neutral-100 h-[10%] flex items-center px-6 justify-between">
            <div className="flex">
              <Link
                className="bg-neutral-300 border-2 border-neutral-400 text-neutral-600 px-4 py-1 rounded-xl w-fit hover:bg-neutral-400"
                href={'/projects'}
              >
                <BsArrowLeft className="text-4xl" />
              </Link>
            </div>
            <input
              className="font-bold font-Montserrat text-4xl focus:outline-0 text-center bg-gray-100"
              onBlur={handleSubmitNewTitle}
              onChange={e => handleChangeProjectTitle(e.target.value)}
              value={projectTitle ? projectTitle : project.title}
            />
            <div className={'font-Roboto font-medium'}>Setting</div>
          </div>

          <div>
            <select
              className="form-select mt-5 mr-7 w-[10%] font-sans text-base text-gray-800 bg-white border-2 border-black rounded-full p-2
              box-border outline-none text-center font-bold appearance-none flex justify-center ml-auto"
              onChange={e => {
                if (e.target.value === 'Create Tag') {
                  setIsPopupOpen(true);
                } else if (e.target.value === 'Delete Tag') {
                  setIsDeletePopupOpen(true);
                } else {
                  setSelectedTag(e.target.value);
                }
              }}
            >
              <option
                onMouseOut={() => setIsHover(false)}
                onMouseOver={() => setIsHover(true)}
                value="All"
              >
                All
              </option>
              {project.tags
                ? project.tags.map((tag, index) =>
                    tag ? (
                      <option key={index} value={tag.title}>
                        {tag.title}
                        {/* {isHover ? (
                    <MdDelete
                      className="bg-black absolute"
                      onClick={() => handleDeleteTag(project.tags[index].id)}
                    />
                  ) : (
                    <></>
                  )} */}
                      </option>
                    ) : null,
                  )
                : null}
              <option value="Create Tag">Create Tag</option>
              <option value="Delete Tag">Delete Tag</option>
            </select>
            {isPopupOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 rounded-3xl">
                <div className="w-1/2 h-1/2 p-2 border-4 border-gray-800 relative flex justify-center items-center bg-white shadow-lg rounded-3xl">
                  {/* Add your tag creation form here */}
                  <form
                    className="w-full p-4 border-2 border-gray-500 flex flex-col space-y-4 bg-white shadow-md rounded-3xl"
                    onSubmit={handleCreateTag}
                  >
                    <input
                      className="p-2 border-2 border-gray-300 rounded-full shadow-sm"
                      onChange={e => setNewTagTitle(e.target.value)}
                      placeholder="Tag title"
                      required
                      type="text"
                      value={newTagTitle}
                    />
                    <input
                      className="p-2 border-2 border-gray-300 rounded-full shadow-sm"
                      onChange={e => setNewTagPriority(Number(e.target.value))}
                      placeholder="Tag priority"
                      required
                      type="number"
                      value={newTagPriority}
                    />
                    <input
                      className="p-2 border-2 border-gray-300 rounded-full shadow-sm"
                      onChange={e => setNewTagColor(e.target.value)}
                      type="color"
                      value={newTagColor}
                    />
                    <button
                      className="p-2 bg-black text-white text-bold rounded-full"
                      type="submit"
                    >
                      Create Tag
                    </button>
                  </form>
                  <button
                    className="absolute top-2 right-2 p-2 bg-black text-white text-bold rounded-full"
                    onClick={() => setIsPopupOpen(false)}
                  >
                    X
                  </button>
                </div>
              </div>
            )}
            {isDeletePopupOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 rounded-3xl">
                <div className="w-1/2 h-1/2 p-2 border-4 border-gray-800 relative flex justify-center items-center bg-white shadow-lg rounded-3xl">
                  {/* Add your tag deletion form */}
                  <form
                    className="w-full p-4 border-2 border-gray-500 flex flex-col space-y-4 bg-white shadow-md rounded-3xl"
                    onSubmit={e => {
                      e.preventDefault();
                      handleDeleteTag(selectedTag);
                    }}
                  >
                    <select
                      className="p-2 border-2 border-gray-300 rounded-full shadow-sm"
                      onChange={e => setSelectedTag(e.target.value)}
                      required
                    >
                      {project.tags.map((tag, index) =>
                        tag ? (
                          <option key={index} value={tag.title}>
                            {tag.title}
                          </option>
                        ) : null,
                      )}
                    </select>
                    <button
                      className="p-2 bg-black text-white text-bold rounded-full"
                      type="submit"
                    >
                      Delete Tag
                    </button>
                  </form>
                  <button
                    className="absolute top-2 right-2 p-2 bg-black text-white text-bold rounded-full"
                    onClick={() => setIsDeletePopupOpen(false)}
                  >
                    X
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* <ListStages
            project={project}
            selectedTag={selectedTag}
            setStageChangingFlag={setStageChangingFlag}
          /> */}
          <KanbanBoard project={project} selectedTag={selectedTag} />
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
