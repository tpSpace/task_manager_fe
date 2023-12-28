import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

import KanbanBoard from './KanbanBoard';
import ListStages from './ListStages';

//import Tag from './Tag';
import UserCard from '@/components/UserCard';
import { ProjectProps, StageProps } from '@/types';

interface SingleProjectProps {
  project: ProjectProps;
  flag: boolean;
  setFlag: () => void;
}

const SingleProject = ({ project, flag, setFlag }: SingleProjectProps) => {
  return (
    <div className="w-full h-full flex flex-row border-2">
      <div className="w-[15%] min-w-[150px] h-full flex flex-col border border-black-100">
        <div className="flex flex-col space-y-3 justify-center items-center h-30 mt-20">
          <div className="border-2 border-black rounded-full h-10 w-full bg-black flex items-center justify-center">
            <p className="text-white text-xl">Task</p>
          </div>
          <div className="border-2 border-black rounded-full h-10 w-full bg-black flex items-center justify-center">
            <p className="text-white text-xl">Timeline</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center py-2 space-y-4 mt-20">
          <div className="text-lg">Members ({project.members.length})</div>
          <div className="flex flex-col space-y-4  ">
            {project.members.map((member, index) => (
              <UserCard key={index} user={member} />
            ))}
          </div>
        </div>
        <div className="text-lg text-center flex-wrap flex flex-end mt-10">
          {' '}
          Copy this code <br /> to add member
          <br /># 1234
        </div>
      </div>
      <div className="flex flex-row w-full h-full overflow-x-auto overflow-y-hidden">
        <div className="w-full h-full">
          <div className="bg-gray-100 h-[10%] flex items-center px-6 justify-between">
            <div className="flex">
              <Link
                className="bg-slate-800 text-white px-4 py-1 rounded-lg w-fit hover:bg-slate-200 hover:text-black"
                href={'/projects'}
              >
                <BsArrowLeft className="text-4xl" />
              </Link>
            </div>
            <div className="font-bold text-4xl">{project.title}</div>
            <div>Setting</div>
          </div>
          {/* <ListStages
            flag={flag}
            project={project}
            setFlag={setFlag}
            stages={project.stages}
          /> */}
          <KanbanBoard project={project} />
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
