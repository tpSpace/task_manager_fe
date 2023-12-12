'use client';

import React, { useEffect, useState } from 'react';

import axios from 'axios';

import SingleProject from '@/components/SingleProject';
import { ProjectProps } from '@/types';

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
  // state storing all the Ids return from backend
  const [projectData, setProjectData] = useState<ProjectDetailProps>({
    projectId: params.projectId,
    title: '',
    stageIds: [],
    memberIds: [],
    adminId: '',
    history: [],
    tagIds: [],
  });

  // the actual state to store the project
  const [project, setProject] = useState<ProjectProps>({
    id: params.projectId,
    title: '',
    stages: [],
    members: [],
    admin: {
      avatar: '',
      email: '',
      userName: '',
      token: '',
      id: '',
    },
    history: [],
    tags: [],
  });

  // main useEffect, use for fetching the whole project
  useEffect(() => {
    const token = localStorage.getItem('token');

    fetchProject(token).then(res => {
      // get all the Ids
      setProjectData(prevData => ({
        ...prevData,
        stageIds: res.stageIds,
        memberIds: res.userIds,
        adminId: res.adminId,
        tagIds: res.tagIds,
      }));

      // get the title and the history
      setProject(prevProject => ({
        ...prevProject,
        title: res.title,
        history: res.history,
      }));
    });
    fetchTags(token);
    fetchStages(token);
  }, []);

  // second useEffect, use for fetching data that required Ids from the first fetching
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (projectData.adminId) {
      fetchAdmin(token);
    }

    if (projectData.memberIds) {
      fetchMembers(token);
    }
  }, [projectData]);

  const fetchProject = async (token: string | null) => {
    const res = await axios.get(
      `http://localhost:3001/projects/get/${params.projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(res.data);

    return res.data.project;
  };

  const fetchAdmin = async (token: string | null) => {
    await axios
      .get(`http://localhost:3001/auth/user/${projectData.adminId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res.data);
        setProject(prevProject => ({
          ...prevProject,
          admin: {
            avatar: res.data.user.avatar,
            email: res.data.user.email,
            userName: res.data.user.name,
            token: res.data.user.token,
            id: res.data.user.userId,
          },
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchMembers = async (token: string | null) => {
    const promises = projectData.memberIds.map(async memberId => {
      return axios.get(`http://localhost:3001/auth/user/${memberId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    });

    const responses = await Promise.all(promises);
    const members = responses.map(response => ({
      avatar: response.data.user.avatar,
      email: response.data.user.email,
      userName: response.data.user.name,
      token: response.data.user.token,
      id: response.data.user.userId,
    }));

    console.log('fetched members');
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

  const fetchStages = async (token: string | null) => {
    await axios
      .get(`http://localhost:3001/stages/getProject/${params.projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res.data);
        setProject(prevProject => ({
          ...prevProject,
          stages: res.data.stages,
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center font-bold text-2xl">
      <SingleProject project={project} />
    </div>
  );
};

export default ProjectDetail;
