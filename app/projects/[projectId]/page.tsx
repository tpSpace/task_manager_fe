'use client';

import React from 'react';

import { ProjectProps } from '@/types';

interface ProjectDetailProps {
  params: {
    projectId: string;
  };
  project?: ProjectProps;
}

const ProjectDetail = ({ params }: ProjectDetailProps) => {
  return (
    <div className="flex justify-center font-bold text-2xl">
      Project {params.projectId} Detail
    </div>
  );
};

export default ProjectDetail;
