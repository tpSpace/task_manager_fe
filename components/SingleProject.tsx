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
    <div className="flex flex-row max-h-screen">
      <div className="flex items-center flex-col bg-gray-200 w-40">
        <div className="relative border-2 border-black rounded-lg h-10 w-5/6 bg-black top-20 flex items-center justify-center hover:bg-white">
          <div className="text-white text-xl hover:text-black">Task</div>
        </div>
        <br />
        <div className="relative border-2 border-black rounded-lg h-10 w-5/6 bg-black flex top-20 items-center justify-center">
          <div className="text-white text-xl">Timeline</div>
        </div>
        {/* display member */}
        <div className="relative flex flex-col w-40 h-screen top-40 items-center space-y-4">
          <div className="text-xl">Members {project.members.length}</div>
          <div className="flex flex-col space-y-4">
            {project.members.map((member, index) => (
              <UserCard key={index} user={member} />
            ))}
          </div>
        </div>
        {/* <div className="text-xl flex justify-center text-center pb-40">
          {' '}
          Copy this code to add member #{project.id}
        </div> */}
      </div>
      <div className="w-100vh h-screen">
        <div className="bg-gray-100 h-20 flex items-center px-6 justify-between">
          <div className=""> Back button </div>
          <div className="font-bold text-4xl">{project.title}</div>
          <div>Setting</div>
        </div>
        <div className="relative top-20 left-10 flex flex-row h-screen space-x-20">
          {project.stages?.map((stage, index) => (
            <SingleStage key={index} stage={stage} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
