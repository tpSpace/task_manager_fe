import { useState } from 'react';
import axios from "axios";
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

  const handleChangeProjectTitle = (newTitle: string) => {
    setProjectTitle(newTitle);
  };

  const handleSubmitNewTitle = async () => {
    const token = localStorage.getItem('token');
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
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
      <div className="w-[15%] min-w-[150px] h-full flex-col items-center flex bg-neutral-300 relative">
        <div className=" space-y-3 h-30 w-1/2 mt-12 ">
          <div className="border-2 rounded-xl h-10 w-full bg-neutral-400 border-neutral-500 flex items-center justify-center">
            <p className="text-white text-xl font-Roboto font-medium">Task</p>
          </div>
          <div className="border-2 rounded-xl h-10 w-full bg-neutral-400 border-neutral-500 flex items-center justify-center">
            <p className="text-white text-xl font-Roboto font-medium">Timeline</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center py-2 space-y-4 mt-20">
          <div className="text-2xl font-Montserrat font-semibold">Members ({project.members.length})</div>
          <div className="flex flex-col space-y-4 ">
            {project.members.map((member, index) => (
              <UserCard key={index} user={member} />
            ))}
          </div>
        </div>
        <div className="mt-4 w-full text-center">
          <span className={"text-lg font-Roboto"}>
            Copy this code to invite
          </span>
          <p className={"text-sm font-Roboto font-bold truncate select-all text-cyan-400 hover:text-cyan-500"}>
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
            <div className={"font-Roboto font-medium"}>Setting</div>
          </div>
          <ListStages
            project={project}
            setStageChangingFlag={setStageChangingFlag}
          />
          {/* <KanbanBoard project={project} /> */}
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
