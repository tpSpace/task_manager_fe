import React from 'react';

import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

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
      <div className="w-[15%] min-w-[150px] h-full border border-black-100">
        <h1>column</h1>
      </div>

      <div className="w-full h-full flex flex-col overflow-x-hidden border border-blue-500">
        <div className="w-full h-[10%] border-2 border-blue-500">
          <div>{project.title}</div>
        </div>
        <div className="flex justify-content w-full h-[90%] border-2 border-blue-500">
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
