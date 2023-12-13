'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';

import CustomButton from '@/components/CustomButton';

interface ProjectInforProps {
  title: string;
  projectId: string;
}

const getFilteredProjects = (search:string, projects:ProjectInforProps[]) => {
  if (!search){
    return projects;
  }
  return projects.filter(project => {
    project.title.toLowerCase().includes(search.toLowerCase());
  });
};
const Projects = () => {
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
      .get(`http://localhost:3001/projects/get`, {
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

  return (
    <div className="flex flex-col justify-center">
      <input
        onChange={(e) => setSearch(e.target.value)}
        placeholder={'Search project'}
        type={'text'}
        value={search}
      />
      <div className="grid place-content-center">
        <CustomButton
          containerStyles="border border-2 border-solid"
          title="+"
        />
        <ul>
          {filteredProjects.map(project => (
            <button
              key={project.projectId}
              onClick={() => router.push(`projects/${project.projectId}`)}
            >
              {project.title}
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
