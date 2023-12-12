'use client';

import React from 'react';

import SingleStage from '@/components/SingleStage';
import UserCard from '@/components/UserCard';
import { StageProps } from '@/types';
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
  const stagesData: StageProps[] = [
    {
      id: 'stage1',
      title: 'To Do',
      tickets: [
        {
          id: 'ticket1',
          title: 'Implement Feature A',
          description: 'Lorem ipsum dolor sit amet...',
          creator: {
            userName: 'JohnDoe',
            id: 'user1',
            avatar: 'url-to-avatar',
            token: 'user-token',
            email: 'asd',
          },
          // ... other TicketProps
        },
        {
          id: 'ticket1',
          title: 'Implement Feature A',
          description: 'Lorem ipsum dolor sit amet...',
          creator: {
            userName: 'JohnDoe',
            id: 'user1',
            avatar: 'url-to-avatar',
            token: 'user-token',
            email: 'asd',
          },
          // ... other TicketProps
        },
        {
          id: 'ticket1',
          title: 'Implement Feature A',
          description: 'Lorem ipsum dolor sit amet...',
          creator: {
            userName: 'JohnDoe',
            id: 'user1',
            avatar: 'url-to-avatar',
            token: 'user-token',
            email: 'asd',
          },
          // ... other TicketProps
        },
        {
          id: 'ticket1',
          title: 'Implement Feature A',
          description: 'Lorem ipsum dolor sit amet...',
          creator: {
            userName: 'JohnDoe',
            id: 'user1',
            avatar: 'url-to-avatar',
            token: 'user-token',
            email: 'asd',
          },
          // ... other TicketProps
        },
        // ... other tickets in the "To Do" stage
      ],
    },
    {
      id: 'stage2',
      title: 'In Progress',
      tickets: [
        {
          id: 'ticket2',
          title: 'Fix Bug B',
          description: 'Lorem ipsum dolor sit amet...',
          creator: {
            userName: 'JaneDoe',
            id: 'user2',
            avatar: 'url-to-avatar',
            token: 'user-token',
            email: 'asd',
          },
          // ... other TicketProps
        },
        // ... other tickets in the "In Progress" stage
      ],
    },
    // ... other stages
  ];

  // You can add more stages or modify the existing ones according to your application requirements.

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
          {stagesData.map((stage, index) => (
            <SingleStage key={index} stage={stage} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
