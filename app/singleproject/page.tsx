'use client';

import React from 'react';

import UserCard from '@/components/UserCard';

const SingleProjectPage = () => {
  const members = [
    { id: 1, userName: 'Huy' },
    { id: 2, userName: 'Khang' },
  ];

  return (
    <div className="flex flex-row">
      <div className="flex items-center flex-col bg-gray-200 w-40 h-screen">
        <div className="relative border-2 border-black rounded-lg h-10 w-5/6 bg-black top-20 flex items-center justify-center">
          <div className="text-white text-xl">Task</div>
        </div>
        <br />
        <div className="relative border-2 border-black rounded-lg h-10 w-5/6 bg-black flex top-20 items-center justify-center">
          <div className="text-white text-xl">Timeline</div>
        </div>
        <div className="relative flex flex-col w-40 h-screen top-40 items-center space-y-4">
          <div className="text-xl">Members ({members.length})</div>
          <div className="flex flex-col space-y-4">
            {members.map(member => (
              <UserCard key={member.id} {...member} />
            ))}
          </div>
          <div className="text-xl flex justify-center text-center">
            {' '}
            Copy this code to add member
          </div>
        </div>
      </div>
      <div className="w-screen h-screen">
        <div className="bg-gray-100 w-full h-20 flex items-center justify-center">
          <div className="relative right-96"> Back button </div>
          <div className="font-bold text-4xl absolute">Project Name</div>
        </div>
      </div>
    </div>
  );
};

export default SingleProjectPage;
