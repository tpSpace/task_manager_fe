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
              <UserCard key={index} user={member} />
            ))}
          </div>
        </div>
        <div
          className="w-full text-center cursor-pointer"
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
              onChange={e => setSelectedTag(e.target.value)}
            >
              <option value="All">All</option>
              {project.tags.map((tag, index) => (
                <option key={index} value={tag.title}>
                  {tag.title}
                </option>
              ))}
              <option value="+">+</option>
            </select>
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
