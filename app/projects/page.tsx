'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';

import CustomButton from '@/components/CustomButton';

interface ProjectInforProps {
  projectName: string;
  projectId: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<ProjectInforProps[]>([]);

  // this hook is for dynamic routing (that's what youtube said, it's more complicated with more hooks required)
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    await axios
      .get(`http://localhost:3001/projects/get`, {})
      .then(res => {
        console.log(res);
        setProjects(res.data);
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
            {project.projectName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Projects;
