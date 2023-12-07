'use client';

import { useRouter } from 'next/navigation';

import CustomButton from '@/components/CustomButton';
import { ProjectProps } from '@/types';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface ProjectInforProps {
  projectName: string;
  projectId: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<ProjectInforProps[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectProps>();

  // this hook is for dynamic routing (that's what youtube said, it's more complicated with more hooks required)
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    await axios
      .get(`http://localhost:3001/projects/get`)
      .then(res => {
        console.log(res);
        setProjects(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchSingleProject = async (id: string) => {
    await axios
      .get(`http://localhost:3001/projects/get/${id}`)
      .then(response => {
        console.log(response);
        setSelectedProject(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // call this function to switch to the selected project
  const handleSwitchProject = (id: string) => {
    // call the fetchSingleProject function here to load the data before navigate user to the project page
    fetchSingleProject(id);
    router.push(`projects/${id}`);
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="grid place-content-center">
        <CustomButton
          containerStyles="border border-2 border-solid"
          title="+"
        />
        {projects.map((project, index) => (
          <button
            onClick={() => handleSwitchProject(project.projectId)}
            key={index}
          >
            {project.projectName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Projects;
