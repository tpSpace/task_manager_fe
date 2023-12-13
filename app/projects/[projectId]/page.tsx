'use client';

import React, { useEffect, useState } from 'react';

import axios from 'axios';

//import SingleProject from '@/components/SingleProject';
import SingleStage from '@/components/SingleStage';
import UserCard from '@/components/UserCard';
import { ProjectProps, StageProps, UserProps } from '@/types';

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
  const stagesData: StageProps[] = [
    {
      id: 'stage1',
      title: 'To Do',
      tickets: [
        {
          id: 'ticket1',
          title: 'Implement Feature A',
          description: 'Lorem ipsum dolor sit amet...',
          creator: {
            userName: 'JohnDoe',
            id: 'user1',
            avatar: 'url-to-avatar',
            token: 'user-token',
            email: 'asd',
          },
          // ... other TicketProps
        },
        {
          id: 'ticket1',
          title: 'Implement Feature A',
          description: 'Lorem ipsum dolor sit amet...',
          creator: {
            userName: 'JohnDoe',
            id: 'user1',
            avatar: 'url-to-avatar',
            token: 'user-token',
            email: 'asd',
          },
          // ... other TicketProps
        },
        {
          id: 'ticket1',
          title: 'Implement Feature A',
          description: 'Lorem ipsum dolor sit amet...',
          creator: {
            userName: 'JohnDoe',
            id: 'user1',
            avatar: 'url-to-avatar',
            token: 'user-token',
            email: 'asd',
          },
          // ... other TicketProps
        },
        {
          id: 'ticket1',
          title: 'Implement Feature A',
          description: 'Lorem ipsum dolor sit amet...',
          creator: {
            userName: 'JohnDoe',
            id: 'user1',
            avatar: 'url-to-avatar',
            token: 'user-token',
            email: 'asd',
          },
          // ... other TicketProps
        },
        // ... other tickets in the "To Do" stage
      ],
    },
    {
      id: 'stage2',
      title: 'In Progress',
      tickets: [
        {
          id: 'ticket2',
          title: 'Fix Bug B',
          description: 'Lorem ipsum dolor sit amet...',
          creator: {
            userName: 'JaneDoe',
            id: 'user2',
            avatar: 'url-to-avatar',
            token: 'user-token',
            email: 'asd',
          },
          // ... other TicketProps
        },
        // ... other tickets in the "In Progress" stage
      ],
    },
    // ... other stages
  ];

  // You can add more stages or modify the existing ones according to your application requirements.

  const members: UserProps[] = [
    { id: '1', userName: 'Huy' },
    { id: '2', userName: 'Khang' },
    { id: '3', userName: 'Khoi' },
  ];
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
    <div className="flex flex-row max-h-screen">
      <div className="flex items-center flex-col bg-gray-200 w-40">
        <div className="relative border-2 border-black rounded-lg h-10 w-5/6 bg-black top-20 flex items-center justify-center hover:bg-white">
          <div className="text-white text-xl hover:text-black">Task</div>
        </div>
        <br />
        <div className="relative border-2 border-black rounded-lg h-10 w-5/6 bg-black flex top-20 items-center justify-center">
          <div className="text-white text-xl">Timeline</div>
        </div>
        {/* display member */}
        <div className="relative flex flex-col w-40 h-screen top-40 items-center space-y-4">
          <div className="text-xl">Members ({members.length})</div>
          <div className="flex flex-col space-y-4">
            {members.map((member, index) => (
              <UserCard key={index} user={member} />
            ))}
          </div>
        </div>
        <div className="text-xl flex justify-center text-center pb-40">
          {' '}
          Copy this code to add member #{params.projectId}
        </div>
      </div>
      <div className="w-screen h-screen">
        <div className="bg-gray-100 h-20 flex items-center px-6 justify-between">
          <div className=""> Back button </div>
          <div className="font-bold text-4xl">
            Project Name {params.projectId}
          </div>
          <div>Setting</div>
        </div>
        <div className="relative top-20 left-10 flex flex-row h-screen space-x-20">
          {stagesData.map((stage, index) => (
            <SingleStage key={index} stage={stage} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
