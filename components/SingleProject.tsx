import React from 'react';

import SingleStage from './SingleStage';
import Tag from './Tag';

import { ProjectProps } from '@/types';

interface SingleProjectProps {
  project: ProjectProps;
}

const SingleProject = ({ project }: SingleProjectProps) => {
  return (
    <div>
      <h1>{project.title}</h1>

      <div>
        <Tag tags={project.tags} />
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
