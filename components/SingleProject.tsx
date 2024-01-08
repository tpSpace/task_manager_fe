import { useState } from 'react';

import axios from 'axios';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

import KanbanBoard from './KanbanBoard';
import ListStages from './ListStages';

//import Tag from './Tag';
import UserCard from '@/components/UserCard';
import { ProjectProps } from '@/types';

interface SingleProjectProps {
  project: ProjectProps;
  setStageChangingFlag: () => void;
}

const SingleProject = ({
  project,
  setStageChangingFlag,
}: SingleProjectProps) => {
  const [projectTitle, setProjectTitle] = useState<string>(project.title);

  const handleChangeProjectTitle = (newTitle: string) => {
    setProjectTitle(newTitle);
  };

  const handleSubmitNewTitle = async () => {
    const token = localStorage.getItem('token');
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    await axios
      .put(
        `${API_URL}/projects/updateTitle/${project.id}`,
        {
          title: projectTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        if (res.status === 200) {
          console.log('Project title updated successfully');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

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
            <input
              className="font-bold text-4xl focus:outline-0 text-center bg-gray-100"
              onBlur={handleSubmitNewTitle}
              onChange={e => handleChangeProjectTitle(e.target.value)}
              value={projectTitle ? projectTitle : project.title}
            />
            <div>Setting</div>
          </div>
          {/* <div>
            <Tag tag={project.tag} />
            <div className="flex flex-row space-x-2">
              {project.tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-full px-2 py-1 text-sm"
                >
                  {tag.title}
                </div>
              ))}
            </div>
          </div> */}
          <div>
            <select className="form-select mt-5 mr-7 w-[10%] font-sans text-base text-gray-800 bg-white border-2 border-black rounded-full p-2
              box-border outline-none text-center font-bold appearance-none flex justify-center ml-auto">
              {project.tags.map((tag, index) => (
                <option key={index} value={tag.title}>
                  {tag.title}
                </option>
              ))}
              <option value="+">+</option>
            </select>
          </div>
          <ListStages
            project={project}
            setStageChangingFlag={setStageChangingFlag}
          />
          {/* <KanbanBoard project={project} /> */}
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
