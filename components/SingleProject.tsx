import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

import ListStages from './ListStages';

//import Tag from './Tag';
import UserCard from '@/components/UserCard';
import { ProjectProps } from '@/types';

interface SingleProjectProps {
  project: ProjectProps;
}

const SingleProject = ({ project }: SingleProjectProps) => {
  return (
    <div className="flex h-full w-full">
      <nav className="flex items-center flex-col bg-gray-200 w-[15%]">
        <div className="flex flex-col space-y-3 justify-start items-center py-20 w-32">
          <div className="border-2 border-black rounded-full h-10 w-full bg-black flex items-center justify-center">
            <div className="text-white text-xl">Task</div>
          </div>
          <div className="border-2 border-black rounded-full h-10 w-full bg-black flex items-center justify-center">
            <div className="text-white text-xl">Timeline</div>
          </div>
        </div>
        {/* display member */}
        <div className="flex flex-col w-40 items-center py-2 space-y-4">
          <div className="text-lg">Members ({project.members.length})</div>
          <div className="flex flex-col space-y-4 max-h-44 overflow-y-auto">
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
      </nav>
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
          <ListStages project={project} stages={project.stages} />
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
