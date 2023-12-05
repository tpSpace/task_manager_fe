import React from 'react';

import { ProjectProps } from '@/types';

interface SingleProjectProps {
  project: ProjectProps;
}

const SingleProject = ({ project }: SingleProjectProps) => {
  return (
    <div>
      <h1>{project.title}</h1>
    </div>
  );
};

export default SingleProject;
