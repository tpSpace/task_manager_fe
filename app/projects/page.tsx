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

  const fetchProjects = async (token: string | null) => {
    await axios
      .get(`${API_URL}/projects/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res);
        setProjects(res.data.projects);
        console.log(projects);
      })
      .catch(err => {
        console.log(err);
      });
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
        console.log(res);
        console.log('Delete project successfully');
        fetchProjects(token);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col justify-center max-w-screen overflow-x-hidden p-8">
      <div className={'flex justify-end w-screen relative'}>
        <input
          className={
            'rounded-full border-[3px] bg-gray-50 border-black text-black text-center ' +
            'font-semibold text-xl h-10 w-1/3 mr-36'
          }
          onChange={e => {
            setSearch(e.target.value);
          }}
          placeholder={'Search project'}
          type={'text'}
          value={search}
        />
        <div className={'pt-1 absolute pr-24 mr-16 opacity-80'}>
          <IoMdSearch className={'text-[30px]'} />
        </div>
      </div>
      <div>
        <div
          className={
            'grid lg:grid-cols-4 grid-cols-2 gap-3 mt-5 ml-10'
          }
        >
          {filteredProjects.map(project => (
            <button
            className={
            ' w-72 h-48 bg-neutral-100 rounded-3xl border-[3px] border-black shadow shadow-black' +
            " relative hover:shadow-lg hover:border-[4px] hover:border-black hover:bg-neutral-200 " +
              " hover:cursor-pointer hover:duration-200 hover:ease-in-out"
            }
            key={project.projectId}
            onClick={() => router.push(`projects/${project.projectId}`)}
            >
              <span className={" absolute text-black text-[35px] font-semibold font-['Montserrat'] " +
                " inset-x-6 inset-y-16 truncate "}>{project.title}</span>
              <MdDelete
                className={' text-2xl absolute z-10 hover:text-3xl top-4 right-4'}
                onClick={() => handleDelete(project.projectId)}
              />
            </button>
          ))}
          <CustomButton
            containerStyles="border-[3px] border-solid border-black rounded-3xl bg-neutral-100 shadow shadow-black
              w-72 h-48 text-black text-6xl hover:bg-neutral-200 hover:border-[4px] hover:border-black hover:duration-200 hover:ease-in-out "
            handleClick={() => setPopup(true)}
            title="+"
          />
          <AddProjectPopUp setTrigger={setPopup} trigger={Popup}>
            <div className="grid grid-cols-2 border-none">
              <div className="bg-white w-[320px] h-[480px] rounded-tl-[20px] rounded-bl-[20px] flex flex-col border-none">
                <span
                  className="font-['Montserrat'] text-[35px] text-center font-medium w-[290px] h-[3.125rem]
                mt-[2.69rem] bg-black text-white rounded-[20px] ml-3.5"
                >
                  Create a project
                </span>
                <button
                  className="w-[10rem] h-[10rem] bg-white text-black border-4 rounded-[20px] text-[100px] hover:text-[120px]
                 mt-[4.12rem] ml-[5rem] border-black  font-medium flex items-center justify-center"
                  onClick={() => {
                    handleCreateProject();
                    setPopup(false);
                  }}
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
                  {' '}
                  Enter the project code:
                </h3>
                <input
                  className="text-center rounded-[20px] w-[250px] h-[40px] bg-white text-black font-medium font-['Montserrat'] border-none mt-2 ml-[35px]"
                  onChange={e => {
                    setProjectCode(e.target.value);
                  }}
                  placeholder="Project code"
                  type="text"
                  value={ProjectCode}
                />
                <button
                  className="text-black text-center w-[6rem] h-[3.125rem] bg-white rounded-[20px] mt-5 ml-[110px]
                font-['Montserrat'] text-2xl font-medium hover:font-semibold hover:text-3xl"
                  onClick={() => {
                    handleJoinProject();
                    setPopup(false);
                    setProjectCode('');
                  }}
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
