import React from 'react';

import { ProjectProps } from '@/types';
import SingleStage from './SingleStage';

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
          <SingleStage stage={stage} key={index} />
        ))}
      </div>
    </div>
  );
};

export default SingleProject;
