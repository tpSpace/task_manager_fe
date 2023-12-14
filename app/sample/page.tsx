'use client';
import React, { useState } from 'react';

import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

import CustomButton from '@/components/CustomButton';
import SingleStage from '@/components/SingleStage';
//import Tag from './Tag';

import UserCard from '@/components/UserCard';
import { ProjectProps, StageProps } from '@/types';

interface SingleProjectProps {
  project: ProjectProps;
}

const SingleProject = ({ project }: SingleProjectProps) => {
  const [stages, setStages] = useState<StageProps[]>([]);
  function createNewStage() {
    const stageToAdd: StageProps = {
      id: generateId(),
      title: 'Stage',
    };
    setStages([...stages, stageToAdd]);
    console.log(stages);
  }
  function generateId() {
    return 'Hi';
  }

  return (
    <div className="flex h-full w-full overflow-hidden">
      <nav className="flex items-center flex-col bg-gray-200 w-40">
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
          <div className="text-xl">Members ({project?.members.length})</div>
          <div className="flex flex-col space-y-4">
            {project?.members.map((member, index) => (
              <UserCard key={index} user={member} />
            ))}
          </div>
        </div>
        <div className="text-xl text-center flex-wrap relative top-60">
          {' '}
          Copy this code <br /> to add member
          <br /># 1234
        </div>
      </nav>
      <div className="w-[76rem] h-full] overflow-hidden">
        <div className="bg-gray-100 h-20 flex items-center px-6 justify-between">
          <div className="flex">
            {' '}
            <Link
              className="bg-slate-800 text-white px-4 py-1 rounded-lg w-fit hover:bg-slate-200 hover:text-black"
              href={'/projects'}
            >
              <BsArrowLeft className="text-4xl" />
            </Link>{' '}
          </div>
          <div className="font-bold text-4xl">{project?.title}</div>
          <div>Setting</div>
        </div>
        <div className="flex flex-row pt-5 h-full w-full overflow-x-auto">
          {
            /* {project?.stages?.map((stage, index) => (
            <SingleStage key={index} stage={stage} />
          ))} */
            stages.map(stag => (
              <SingleStage stage={stag} />
            ))
          }
          <CustomButton
            containerStyles="mt-20 mx-10 w-72 h-4/6 rounded-lg border border-black justify-between text-6xl"
            handleClick={createNewStage}
            title="+"
          ></CustomButton>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
