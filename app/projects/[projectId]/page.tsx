'use client';

import React, { useEffect, useState } from 'react';

import axios from 'axios';

import SingleProject from '@/components/SingleProject';
import { ProjectProps } from '@/types';

interface ProjectDetailProps {
  params: {
    projectId: string;
  };
}

const ProjectDetail = ({ params }: ProjectDetailProps) => {
  const [project, setProject] = useState<ProjectProps>({
    id: '',
    title: '',
    stages: [],
    members: [],
    admin: {
      userName: '',
      id: '',
      avatar: '',
      token: '',
    },
    history: [],
    tags: [],
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetchProject(token);
  }, []);

  const fetchProject = async (token: string | null) => {
    await axios
      .get(`http://localhost:3001/projects/get/${params.projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res);
        setProject({
          id: res.data.id,
          title: res.data.title,
          stages: res.data.stages,
          members: res.data.members,
          admin: {
            userName: res.data.admin.userName,
            id: res.data.admin.id,
            avatar: res.data.admin.avatar,
            token: res.data.admin.token,
          },
          history: res.data.history,
          tags: res.data.tags,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center font-bold text-2xl">
      Project {params.projectId} Detail
      <SingleProject project={project} />
    </div>
  );
};

export default ProjectDetail;
