import React from 'react';

import { ProjectProps } from '@/types';

const SingleProject = ({ title }: ProjectProps) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default SingleProject;
