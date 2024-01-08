import { useState } from 'react';

import axios from 'axios';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

import KanbanBoard from './KanbanBoard';
import ListStages from './ListStages';

//import Tag from './Tag';
import UserCard from '@/components/UserCard';
import { ProjectProps } from '@/types';

interface SingleProjectProps {
  project: ProjectProps;
  setStageChangingFlag: () => void;
}

const SingleProject = ({
  project,
  setStageChangingFlag,
}: SingleProjectProps) => {
  const [projectTitle, setProjectTitle] = useState<string>(project.title);
  const token = localStorage.getItem('token');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [isPopupOpen, setIsPopupOpen] = useState(false); // New state variable

  const [newTagTitle, setNewTagTitle] = useState<string>('');
  const [newTagPriority, setNewTagPriority] = useState<number>(1);
  const [newTagColor, setNewTagColor] = useState<string>('#ffffff');

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

    try {
      const response = await fetch(`${API_URL}/tags/create/${project.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTagTitle,
          priority: newTagPriority,
          colour: newTagColor,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdTag = await response.json();
      project.tags.push(createdTag);
      setIsPopupOpen(false);
      setNewTagTitle('');
      setNewTagPriority(1);
      setNewTagColor('#ffffff');
    } catch (error) {
      console.error('An error occurred while creating the tag:', error);
    }
  };

  return (
    <div className="w-full h-full flex flex-row justify-center items-center border-r-2">
      <div className="w-[15%] min-w-[150px] h-full flex-col items-center flex bg-neutral-300 relative">
        <div className=" space-y-3 h-30 w-1/2 mt-12 ">
          <div className="border-2 rounded-xl h-10 w-full bg-neutral-400 border-neutral-500 flex items-center justify-center">
            <p className="text-white text-xl font-Roboto font-medium">Task</p>
          </div>
          <div className="border-2 rounded-xl h-10 w-full bg-neutral-400 border-neutral-500 flex items-center justify-center">
            <p className="text-white text-xl font-Roboto font-medium">
              Timeline
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center py-2 space-y-4 mt-20">
          <div className="text-2xl font-Montserrat font-semibold">
            Members ({project.members.length})
          </div>
          <div className="flex flex-col space-y-4">
            {project.members.map((member, index) => (
              <UserCard key={index} user={member} />
            ))}
          </div>
        </div>
        <div
          className="mt-4 w-full text-center cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(project.id);
          }}
        >
          <span className={'text-lg font-Roboto'}>
            Copy this code to invite
          </span>
          <p
            className={
              'text-sm font-Roboto font-bold truncate text-cyan-400 hover:text-cyan-500'
            }
          >
            {project.id}
          </p>
        </div>
      </div>
      <div className="flex flex-row w-full h-full overflow-x-auto overflow-y-hidden">
        <div className="w-full h-full">
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
          {/* <div>
            <Tag tag={project.tag} />
            <div className="flex flex-row space-x-2">
              {project.tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-full px-2 py-1 text-sm"
                >
                  {tag.title}
                </div>
              ))}
            </div>
          </div> */}
          <div>
            <select
              className="form-select mt-5 mr-7 w-[10%] font-sans text-base text-gray-800 bg-white border-2 border-black rounded-full p-2
              box-border outline-none text-center font-bold appearance-none flex justify-center ml-auto"
              onChange={e => {
                if (e.target.value === '+') {
                  setIsPopupOpen(true);
                } else {
                  setSelectedTag(e.target.value);
                }
              }}
            >
              <option value="All">All</option>
              {project.tags.map((tag, index) => (
                <option key={index} value={tag.title}>
                  {tag.title}
                </option>
              ))}
              <option value="+">+</option>
            </select>
            {isPopupOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="w-1/2 h-1/2 p-2 border-3 relative flex justify-center items-center bg-white">
                  {/* Add your tag creation form here */}
                  <form
                    className="w-full p-4 border-2 border-gray-300 rounded flex flex-col space-y-4"
                    onSubmit={handleCreateTag}
                  >
                    <input
                      className="p-2 border-2 border-gray-300 rounded"
                      onChange={e => setNewTagTitle(e.target.value)}
                      placeholder="Tag title"
                      required
                      type="text"
                      value={newTagTitle}
                    />
                    <input
                      className="p-2 border-2 border-gray-300 rounded"
                      onChange={e => setNewTagPriority(Number(e.target.value))}
                      placeholder="Tag priority"
                      required
                      type="number"
                      value={newTagPriority}
                    />
                    <input
                      className="p-2 border-2 border-gray-300 rounded"
                      onChange={e => setNewTagColor(e.target.value)}
                      type="color"
                      value={newTagColor}
                    />
                    <button
                      className="p-2 bg-blue-500 text-white rounded"
                      type="submit"
                    >
                      Create Tag
                    </button>
                  </form>
                  <button
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded"
                    onClick={() => setIsPopupOpen(false)}
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
          <KanbanBoard project={project} />
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
