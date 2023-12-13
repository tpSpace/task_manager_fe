import React from 'react';

import SingleStage from './SingleStage';
//import Tag from './Tag';

import UserCard from '@/components/UserCard';
import { ProjectProps } from '@/types';

interface SingleProjectProps {
  project: ProjectProps;
}

const SingleProject = ({ project }: SingleProjectProps) => {
  return (
    <div className="flex flex-row max-h-[47rem] w-full overflow-x-hidden overflow-y-hidden">
      <div className="flex items-center flex-col bg-gray-200 w-40">
        <div className="flex flex-col space-y-3 justify-start items-center py-20 w-32">
          <div className="border-2 border-black rounded-full h-10 w-full bg-black flex items-center justify-center">
            <div className="text-white text-xl">Task</div>
          </div>
          <div className="border-2 border-black rounded-full h-10 w-full bg-black flex items-center justify-center">
            <div className="text-white text-xl">Timeline</div>
          </div>
        </div>
        {/* display member */}
        <div className="flex flex-col w-40 max-h-64 items-center py-2 space-y-4 overflow-y-auto">
          <div className="text-xl">Members ({project.members.length})</div>
          <div className="flex flex-col space-y-4">
            {project.members.map((member, index) => (
              <UserCard key={index} user={member} />
            ))}
          </div>
        </div>
        <div className="text-xl text-center flex-wrap relative top-60">
          {' '}
          Copy this code <br /> to add member
          <br /># 1234
        </div>
      </div>
      <div className="w-full h-full">
        <div className="bg-gray-100 h-20 flex items-center px-6 justify-between">
          <div className=""> Back button </div>
          <div className="font-bold text-4xl">{project.title}</div>
          <div>Setting</div>
        </div>
        <div className="relative top-20 left-20 flex flex-row h-screen space-x-20">
          {project.stages?.map((stage, index) => (
            <SingleStage key={index} stage={stage} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
