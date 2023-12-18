import React from 'react';

import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

import CustomButton from './CustomButton';
import KanbanBoard from './KanbanBoard';
import ListStages from './ListStages';

//import Tag from './Tag';
import UserCard from '@/components/UserCard';
import { ProjectProps } from '@/types';

interface SingleProjectProps {
  project: ProjectProps;
}

const SingleProject = ({ project }: SingleProjectProps) => {
  return (
    <div className="w-full h-full flex flex-row border-2 border-sky-500">
      <div className="w-[15%] min-w-[150px] h-full flex flex-col justify-evenly border border-black-100">
        <div className="flex flex-col">
          <CustomButton containerStyles={`p-4`} title={'Task'} />
          <CustomButton containerStyles={`p-4`} title={'Stage'} />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <h1>Members</h1>
          {project.members.map(member => (
            <UserCard key={member.id} user={member} />
          ))}
        </div>
      </div>

      <div className="w-full h-full flex flex-col overflow-x-hidden border border-blue-500">
        <div className="flex flex-row justify-between items-center w-full h-[10%] px-4 border-2">
          <Link
            className="bg-slate-800 text-white px-4 py-1 rounded-lg w-fit hover:bg-slate-200 hover:text-black"
            href={'/projects'}
          >
            <BsArrowLeft className="text-3xl" />
          </Link>
          <div className="font-bold text-3xl">{project.title}</div>
          <div>Setting</div>
        </div>

        <div className="flex justify-content w-full h-[90%] border-2 border-blue-500">
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
