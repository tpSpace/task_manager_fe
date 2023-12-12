import React from 'react';

import { ProjectProps } from '@/types';

interface SingleProjectProps {
  project: ProjectProps;
}

const SingleProject = ({ project }: SingleProjectProps) => {
  return (
    <div>
      <h1>{project.title}</h1>

      <div>Admin name: {project.admin.userName}</div>

      <div>
        {project.members?.map((member, index) => (
          <p key={index}>Member name: {member.userName}</p>
        ))}
      </div>

      <div>
        {project.tags?.map((tag, index) => (
          <p key={index}>tag name: {tag.title}</p>
        ))}
      </div>
    </div>
  );
};

export default SingleProject;
