'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';

import CustomButton from '@/components/CustomButton';

interface ProjectInfoProps {
  projectName: string;
  projectId: string;
}
const getFilteredProjects = (search: string, projects: ProjectInfoProps[]) => {
  if (!search) {
    return projects;
  }

  return projects.filter(project =>
    project.projectName.toLowerCase().includes(search.toLowerCase()),
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<ProjectInfoProps[]>([]);
  const [search, setSearch] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    await axios
      .get<ProjectInfoProps>(`http://localhost:3001/projects/get`)
      .then(res => {
        setProjects(setStateAction => [...setStateAction, res.data]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleClick = () => {
    router.push('projects/newProject');
  };

  const filteredProjects = getFilteredProjects(search, projects);

  return (
    <div className="flex flex-col justify-center">
      <div className="Search">
        <input
          className="border-radius-1.875 w-36.875 h-3.125"
          onChange={e => setSearch(e.target.value)}
          placeholder="Search project"
          type="text"
          value={search}
        />
        <ul>
          {filteredProjects.map((project: ProjectInfoProps) => (
            <button
              className={
                'w-18.75 h-12.5 border-radius-1.5625 background-color-#E6E6E6'
              }
              key={project.projectId}
              onClick={() => router.push(`projects/${project.projectId}`)}
            >
              {project.projectName}
            </button>
          ))}
        </ul>
      </div>
      <div className="grid place-content-center">
        <CustomButton
          containerStyles="border border-2 border-solid"
          handleClick={() => handleClick}
          title="+"
        />
      </div>
    </div>
  );
};

export default Projects;
