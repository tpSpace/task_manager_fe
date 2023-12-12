'use client';

import React, { useEffect, useState } from 'react';

import axios from 'axios';

import SingleProject from '@/components/SingleProject';
import { ProjectProps, UserProps } from '@/types';

interface ProjectDetailProps {
  projectId: string;
  title: string;
  stageIds: string[];
  memberIds: string[];
  adminId: string;
  history: string[];
  tagIds: string[];
}

const ProjectDetail = ({ params }: { params: { projectId: string } }) => {
  const [projectData, setProjectData] = useState<ProjectDetailProps>({
    projectId: params.projectId,
    title: '',
    stageIds: [],
    memberIds: [],
    adminId: '',
    history: [],
    tagIds: [],
  });

  const [project, setProject] = useState<ProjectProps>({
    id: params.projectId,
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

  // main useEffect, use for fetching the whole project
  useEffect(() => {
    const token = localStorage.getItem('token');

    fetchTags(token);
    fetchProject(token);
  }, []);

  const fetchProject = async (token: string | null): Promise<ProjectProps> => {
    const res = await axios.get(
      `http://localhost:3001/projects/get/${params.projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(res.data);
    setProjectData(prevData => ({
      ...prevData,
      stageIds: res.data.project.stageIds,
      memberIds: res.data.project.userIds,
      adminId: res.data.project.adminId,
      tagIds: res.data.project.tagsIds,
    }));

    setProject(prevProject => ({
      ...prevProject,
      title: res.data.project.title,
      history: res.data.project.history,
    }));

    await fetchAdmin(token);
    await fetchMembers(token);

    console.log(projectData);
    return res.data.project;
  };

  const fetchAdmin = async (token: string | null) => {
    await axios
      .get(`http://localhost:3001/user/${projectData.adminId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res.data);
        setProject(prevProject => ({
          ...prevProject,
          admin: res.data.user,
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchMembers = async (token: string | null) => {
    const members: UserProps[] = [];
    projectData.memberIds.forEach(async memberId => {
      await axios
        .get(`http://localhost:3001/user/${memberId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          console.log(res.data);
          members.push(res.data.user);
        })
        .catch(err => {
          console.log(err);
        });
    });

    console.log(members);
    setProject(prevProject => ({
      ...prevProject,
      members: members,
    }));
  };

  const fetchTags = async (token: string | null) => {
    await axios
      .get(`http://localhost:3001/tags/get/${params.projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setProject(prevProject => ({
          ...prevProject,
          tags: res.data.tag,
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center font-bold text-2xl">
      Project {params.projectId} Detail
      <SingleProject project={project} />
    </div>
  );
};

export default ProjectDetail;
