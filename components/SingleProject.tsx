import React from 'react';

import SingleStage from './SingleStage';

import { ProjectProps } from '@/types';

interface SingleProjectProps {
  project: ProjectProps;
}

const SingleProject = ({ project }: SingleProjectProps) => {
  return (
    <div>
      <h1>{project.title}</h1>

      <div>
        {project.tags?.map((tag, index) => (
          <p key={index}>tag name: {tag.title}</p>
        ))}
      </div>

      <div>
        {project.stages?.map((stage, index) => (
          <SingleStage key={index} stage={stage} />
        ))}
      </div>
    </div>
  );
};

export default SingleProject;
