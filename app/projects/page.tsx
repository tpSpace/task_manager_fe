'use client';

import { useRouter } from 'next/navigation';

import CustomButton from '@/components/CustomButton';

const Projects = () => {
  // const [projects, setProjects] = useState<ProjectProps[]>([]);

  // this hook is for dynamic routing (that's what youtube said, it's more complicated with more hooks required)
  const router = useRouter();

  // sample project ID
  const projectId = '123456';

  // useEffect(() => {
  //   fetchProjects();
  // }, []);

  // const fetchProjects = async () => {

  // }

  // const fetchSingleProject = async (projeccId) => {
  //   await axios
  //     .get(`http://localhost:3001/${projectId}`)
  //     .then(response => {
  //       console.log(response);
  //       setProjects(response.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  // call this function to switch to the selected project
  const handleSwitchProject = () => {
    // call the fetchSingleProject function here to load the data before navigate user to the project page
    router.push(`projects/${projectId}`);
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="grid place-content-center">
        <CustomButton
          containerStyles="border border-2 border-solid"
          title="+"
        />
        {/* {projects.map((project, index) => (
          <SingleProject key={index} project={project} />
        ))} */}
        <button onClick={handleSwitchProject}>Sample project</button>
      </div>
    </div>
  );
};

export default Projects;
