import React from 'react';

import { ProjectProps } from '@/types';

interface SingleProjectProps {
  project: ProjectProps;
}

const SingleProject = ({ project }: SingleProjectProps) => {
  return (
    <div>
      <h1>{project.title}</h1>
      <div>
        {project.members?.map((member, index) => (
          <p key={index}>member's name: {member.userName}</p>
        ))}
      </div>

      <div>
        {project.tags?.map((tag, index) => (
          <p key={index}>tag's name: {tag.title}</p>
        ))}
      </div>
    </div>
  );
};

export default SingleProject;
