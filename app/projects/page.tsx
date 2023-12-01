'use client';
import React from 'react';

import CustomButton from '@/components/CustomButton';
import SingleProject from '@/components/SingleProject';
import { ProjectProps } from '@/types';

const Projects = () => {
  const projects: ProjectProps[] = [];

  return (
    <div className="flex justify-center">
      <CustomButton containerStyles="border border-2 border-solid" title="+" />
      {projects.map((project, index) => (
        <SingleProject
          admin={project.admin}
          id={project.id}
          key={index}
          members={project.members}
          stages={project.stages}
          title={project.title}
          history={[]}
          tags={[]}
        />
      ))}
    </div>
  );
};

export default Projects;
