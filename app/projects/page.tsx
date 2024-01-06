'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { IoMdSearch } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';

import AddProjectPopUp from '@/components/AddProjectPopUp';
import CustomButton from '@/components/CustomButton';

interface ProjectInforProps {
  title: string;
  projectId: string;
  adminId: string;
  adminName: string;
}

const getFilteredProjects = (search: string, projects: ProjectInforProps[]) => {
  if (!search) {
    return projects;
  }

  return projects.filter(project =>
    project.title.toLowerCase().includes(search.toLowerCase()),
  );
};
const Projects = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [projects, setProjects] = useState<ProjectInforProps[]>([]);
  const [search, setSearch] = useState<string>('');
  const [ProjectCode, setProjectCode] = useState<string>('');
  const [Popup, setPopup] = useState<boolean>(false);

  const filteredProjects = getFilteredProjects(search, projects);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetchProjects(token);
  }, []);

  const fetchAdmin = async (adminId: string, projectId: string) => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${API_URL}/auth/user/${adminId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  };

  const fetchProjects = async (token: string | null) => {
    const {
      data: { projects },
    } = await axios.get(`${API_URL}/projects/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const projectData = await Promise.all(
      projects.map(async (project: ProjectInforProps) => {
        return await fetchAdmin(project.adminId, project.projectId);
      }),
    );
    const filteredData = projects.map((project: ProjectInforProps) => {
      const admin = projectData.find(
        (data: any) => data.user.userId === project.adminId,
      );
      if (admin) {
        return { ...project, adminName: admin.user.name };
      }

      return project;
    });
    setProjects(filteredData);
  };
  const handleCreateProject = async () => {
    const token = localStorage.getItem('token');
    await axios
      .post(
        `${API_URL}/projects/create`,
        {
          title: 'New Project',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        console.log(res);
        fetchProjects(token);
        //router.push(`projects/${res.data.projectId}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleJoinProject = async () => {
    const token = localStorage.getItem('token');
    await axios
      .post(
        `${API_URL}/projects/join/${ProjectCode}`,
        {
          projectId: ProjectCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        console.log(res);
        fetchProjects(token);
      })
      .catch(err => {
        console.log(err);
        alert('Project code is not valid');
      });
  };
  const handleDelete = async (projectId: string) => {
    const token = localStorage.getItem('token');
    await axios
      .delete(`${API_URL}/projects/delete/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('Delete project successfully');
        fetchProjects(token);
      })
      .catch(err => {
        console.log(err);
        alert('Delete project failed');
      });
  };

  const getAdminName = async (adminId: string, projectId: string) => {
    const token = localStorage.getItem('token');
    await axios
      .get(`${API_URL}/auth/user/${adminId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        //console.log(res);
        setProjects(tempProjects =>
          tempProjects.map(project =>
            project.projectId === projectId
              ? { ...project, adminName: res.data.user.name }
              : project,
          ),
        );
      })

      .catch(err => {
        console.log(err);
      });
  };

  const getProjectAdminName = (tempProjects: ProjectInforProps[]) => {
    tempProjects.map(project => {
      getAdminName(project.adminId, project.projectId);
    });
  };

  return (
    <div className=" flex flex-col justify-center max-w-screen overflow-x-hidden p-8 ">
      <div className={' flex justify-end w-screen relative '}>
        <input
          className={
            ' text-black text-center border-black rounded-full border-[3px] bg-gray-50 ' +
            ' text-l h-10 w-1/4 mr-36 ' +
            ' shadow shadow-black hover:ease-out hover:duration-500 hover:text-xl hover:font-semibold hover:w-1/3 focus:text-xl focus:font-semibold focus:w-1/3 '
          }
          onChange={e => {
            setSearch(e.target.value);
          }}
          placeholder={'Search project'}
          type={'text'}
          value={search}
        />
        <div className={' pt-1 absolute pr-24 mr-16 opacity-80 '}>
          <IoMdSearch className={' text-[30px] '} />
        </div>
      </div>
      <div>
        <div
          className={
            ' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-5 ml-10 '
          }
        >
          {filteredProjects.map(project => (
            <button
              className={
                ' flex relative w-72 h-48 bg-neutral-100 rounded-3xl border-[3px] border-black hover:scale-105' +
                ' hover:border-[4px] shadow shadow-black hover:ease-out hover:duration-100 hover:bg-neutral-200 pointer-events-auto '
              }
              key={project.projectId}
              onClick={() => router.push(`projects/${project.projectId}`)}
              type="button"
            >
              <MdDelete
                className={
                  ' text-2xl z-10 hover:scale-125 absolute top-3 right-3 ' +
                  ' cursor-pointer hover:ease-out hover:duration-200 '
                }
                onClick={(event: MouseEvent) => {
                  event.stopPropagation();
                  handleDelete(project.projectId);
                }}
              />
              <span
                className={
                  ' absolute inset-x-7 inset-y-16 truncate ' +
                  " text-black text-[35px] font-semibold font-['Montserrat'] "
                }
              >
                {project.title}
              </span>
              <span
                className={
                  " absolute bottom-2 left-2 font-semibold font-['Montserrat'] text-black "
                }
              >
                Created by: {project.adminName}
              </span>
            </button>
          ))}
          <CustomButton
            containerStyles=" border-[3px] border-solid border-black rounded-3xl bg-neutral-100 hover:scale-105
              w-72 h-48 text-black text-6xl relative hover:border-[4px] shadow shadow-black hover:ease-out hover:duration-200 hover:bg-neutral-200 pb-3 "
            handleClick={() => setPopup(true)}
            title="+"
          />
          <AddProjectPopUp setTrigger={setPopup} trigger={Popup}>
            <div className=" grid grid-cols-2 border-none ">
              <div className=" bg-white w-[320px] h-[480px] rounded-tl-[20px] rounded-bl-[20px] flex flex-col border-none ">
                <span
                  className="font-['Montserrat'] text-[35px] text-center font-medium w-[290px] h-[3.125rem]
                mt-[2.69rem] bg-black text-white rounded-[20px] ml-3.5 "
                >
                  Create a project
                </span>
                <button
                  className=" flex items-center justify-center w-[10rem] h-[10rem] bg-white text-black border-4 rounded-[20px] text-[60px] hover:scale-105
                 mt-[4.12rem] ml-[5rem] border-black font-medium hover:ease-out hover:duration-100 pb-3 hover:pb-4 "
                  onClick={() => {
                    handleCreateProject();
                    setPopup(false);
                  }}
                  type="button"
                >
                  +
                </button>
              </div>
              <div className="bg-black w-[320px] h-[480px] rounded-tr-[20px] rounded-br-[20px] flex flex-col border-none">
                <span
                  className="text-black text-center font-['Montserrat'] text-[35px] font-medium w-[290px] h-[3.125rem]
                mt-[2.69rem] bg-white rounded-[20px] ml-3.5"
                >
                  Join a project
                </span>
                <h3 className="text-white text-center text-xl mt-[70px] font-medium">
                  Enter the project code:
                </h3>
                <input
                  className="text-center rounded-[20px] w-[150px] h-[40px] bg-white text-black font-medium font-['Montserrat'] border-none mt-2 ml-[80px]
                  focus:w-[250px] focus:text-2xl focus:font-semibold hover:duration-500 hover:ease-out hover:w-[250px]
                  hover:text-2xl hover:font-semibold hover:ml-[35px] focus:ml-[35px]"
                  onChange={e => {
                    setProjectCode(e.target.value);
                  }}
                  placeholder="Project code"
                  type="text"
                  value={ProjectCode}
                />
                <button
                  className="text-black text-center w-[6rem] h-[3.125rem] bg-white rounded-[20px] mt-5 ml-[110px]
                font-['Montserrat'] text-2xl font-medium hover:font-semibold hover:text-3xl hover:ease-out hover:duration-100"
                  onClick={() => {
                    handleJoinProject();
                    setPopup(false);
                    setProjectCode('');
                  }}
                  type="button"
                >
                  Join
                </button>
              </div>
            </div>
          </AddProjectPopUp>
        </div>
      </div>
    </div>
  );
};

export default Projects;
