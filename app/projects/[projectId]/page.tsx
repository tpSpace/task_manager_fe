'use client';

// import React, { useEffect, useState } from 'react';

// import axios from 'axios';

import { ProjectProps } from '@/types';

interface ProjectDetailProps {
  params: {
    projectId: string;
  };
  project?: ProjectProps;
}

const ProjectDetail = ({ params }: ProjectDetailProps) => {
  return <div>Project {params.projectId} Detail</div>;
};

export default ProjectDetail;
