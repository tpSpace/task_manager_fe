'use client';

import React from 'react';

import CustomButton from '@/components/CustomButton';
import UserCard from '@/components/UserCard';
// import { ProjectProps } from '@/types';

interface ProjectDetailProps {
  params: {
    projectId: string;
  };
  // project?: ProjectProps;
}

const ProjectDetail = ({ params }: ProjectDetailProps) => {
  // This is the sample members in single project
  const members = [
    { id: 1, userName: 'Huy' },
    { id: 2, userName: 'Khang' },
    { id: 3, userName: 'Khoi' },
  ];

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
          <div className="text-xl">Members ({members.length})</div>
          <div className="flex flex-col space-y-4">
            {members.map(member => (
              <UserCard key={member.id} {...member} />
            ))}
          </div>
        </div>
        <div className="text-xl flex justify-center text-center pb-40">
          {' '}
          Copy this code to add member #{params.projectId}
        </div>
      </div>
      <div className="w-screen h-screen">
        <div className="bg-gray-100 h-20 flex items-center px-6 justify-between">
          <div className=""> Back button </div>
          <div className="font-bold text-4xl">
            Project Name {params.projectId}
          </div>
          <div>Setting</div>
        </div>
        <div className="relative top-20 left-10 flex flex-row h-screen space-x-20">
          <div className="w-64 h-4/6 ml-2 rounded-lg border border-black flex justify-between flex-col">
            <div className="h-12 relative -top-5 flex items-center justify-center border rounded-full bg-black text-white text-3xl">
              To do
            </div>
            <div className="flex flex-col justify-between items-center">
              ListCard
            </div>
            <div className="h-20 p-2 flex items-center justify-center">
              <CustomButton
                containerStyles="border-solid w-56 rounded-lg mb-16 h-20 text-6xl flex justify-center bg-gray-100 items-center"
                title="+"
              />
            </div>
          </div>
          <div className="w-64 h-4/6 ml-2 rounded-lg border border-black flex justify-between flex-col">
            <div className="h-12 relative -top-5 flex items-center justify-center border rounded-full bg-black text-white text-3xl">
              In process
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
