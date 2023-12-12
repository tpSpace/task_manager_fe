'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';

import CustomButton from '@/components/CustomButton';

interface ProjectInforProps {
  title: string;
  projectId: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<ProjectInforProps[]>([]);

  // this hook is for dynamic routing (that's what youtube said, it's more complicated with more hooks required)
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
      <div className="grid place-content-center">
        <CustomButton
          containerStyles="border border-2 border-solid"
          title="+"
        />
        {projects.map((project, index) => (
          <button
            key={index}
            onClick={() => router.push(`projects/${project.projectId}`)}
          >
            {project.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Projects;
