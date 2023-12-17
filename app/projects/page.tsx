'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { IoMdSearch } from 'react-icons/io';

import CustomButton from '@/components/CustomButton';

interface ProjectInforProps {
  title: string;
  projectId: string;
}

const getFilteredProjects = (search: string, projects: ProjectInforProps[]) => {
  if (!search) {
    return projects;
  }

  return projects.filter(project =>
    project.title.toLowerCase().includes(search.toLowerCase()),
  );
};
const Projects = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [projects, setProjects] = useState<ProjectInforProps[]>([]);
  const [search, setSearch] = useState<string>('');

  const filteredProjects = getFilteredProjects(search, projects);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetchProjects(token);
  }, []);

  const fetchProjects = async (token: string | null) => {
    await axios
      .get(`${API_URL}/projects/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res);
        setProjects(res.data.projects);
        console.log(projects);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleClick = () => {
    console.log('add new project');
  };

  return (
    <div className="flex flex-col justify-center max-w-screen overflow-x-hidden p-8">
      <div className={'flex justify-end w-screen relative'}>
        <input
          className={
            'rounded-full border-2 bg-gray-200 border-black text-black text-center font-semibold text-xl h-10 w-1/3 mr-36'
          }
          onChange={e => setSearch(e.target.value)}
          placeholder={'Search project'}
          type={'text'}
          value={search}
        />
        <div className={'pt-1 absolute pr-24 mr-16 opacity-80'}>
          <IoMdSearch className={'text-[30px]'} />
        </div>
      </div>
      <div>
        <div className={'grid grid-cols-4 gap-3 mt-5 ml-10'}>
          {filteredProjects.map(project => (
            <button
              className={
                "w-72 h-48 bg-neutral-200 rounded-3xl border-2 border-black text-black text-[40px] font-semibold font-['Montserrat']"
              }
              key={project.projectId}
              onClick={() => router.push(`projects/${project.projectId}`)}
            >
              {project.title}
            </button>
          ))}
          <CustomButton
            containerStyles="border-2 border-solid border-black rounded-3xl bg-neutral-200 w-72 h-48 text-black text-5xl"
            handleClick={() => handleClick()}
            title="+"
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
