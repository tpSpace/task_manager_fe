'use client';

import React, { useEffect, useState } from 'react';

import axios from 'axios';

import SingleProject from '@/components/SingleProject';
import { ProjectProps } from '@/types';

interface ProjectDetailProps {
  stageIds: string[];
  memberIds: string[];
  adminId: string;
}

const token = localStorage.getItem('token');

const ProjectDetail = ({ params }: { params: { projectId: string } }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // state storing all the Ids return from backend
  const [projectData, setProjectData] = useState<ProjectDetailProps>({
    stageIds: [],
    memberIds: [],
    adminId: '',
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
    fetchProject(token).then(res => {
      // get all the Ids
      setProjectData(prevData => ({
        ...prevData,
        stageIds: res.stageIds,
        memberIds: res.userIds,
        adminId: res.adminId,
      }));

      // get the title and the history
      setProject(prevProject => ({
        ...prevProject,
        title: res.title,
        history: res.history,
      }));
    });
    fetchTags(token);
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

    if (projectData.stageIds) {
      updateStages(token);
    }
  }, [projectData]);

  // fetch all the Ids of all stages, members, and admin
  const fetchProject = async (token: string | null) => {
    const res = await axios.get(`${API_URL}/projects/get/${params.projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.project;
  };

  const fetchAdmin = async (token: string | null) => {
    await axios
      .get(`${API_URL}/auth/user/${projectData.adminId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
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
      return axios.get(`${API_URL}/auth/user/${memberId}`, {
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

    setProject(prevProject => ({
      ...prevProject,
      members: members,
    }));
  };

  const fetchTags = async (token: string | null) => {
    await axios
      .get(`${API_URL}/tags/get/project/${params.projectId}`, {
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
    const response = await axios.get(
      `${API_URL}/stages/get/project/${params.projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.stages;
  };

  const updateStages = async (token: string | null) => {
    const fetchedStages = await fetchStages(token);

    const promises = fetchedStages.map(
      async (stage: { stageId: string; title: string }) => {
        const fetchedTickets = await fetchTickets(token, stage.stageId);

        return {
          id: stage.stageId,
          title: stage.title,
          tickets: fetchedTickets,
        };
      },
    );

    const updatedStages = await Promise.all(promises);

    setProject(prevProject => ({
      ...prevProject,
      stages: updatedStages,
    }));
    console.log('updated Stages');
  };

  const fetchTickets = async (token: string | null, stageId: string) => {
    try {
      const responses = await axios.get(
        `${API_URL}/tickets/get/stage/${stageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return responses.data.tickets;
    } catch (err) {
      console.log(err);

      return null;
    }
  };

  return (
    <div className="h-[90%] w-full">
      <SingleProject project={project} />
    </div>
  );
};

export default ProjectDetail;
