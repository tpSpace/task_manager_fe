import React, { useState } from 'react';

import SingleStage from './SingleStage';
import StageCreationForm from './StageCreateForm';

import CustomButton from '@/components/CustomButton';
import { ProjectProps, StageProps } from '@/types';

interface ListStagesProps {
  stages: StageProps[];
  project: ProjectProps;
}
const ListStages = ({ project }: ListStagesProps) => {
  const [isStageFormOpen, setIsStageFormOpen] = useState(false);

  const openStageForm = () => {
    setIsStageFormOpen(true);
  };

  const closeStageForm = () => {
    setIsStageFormOpen(false);
  };
  // const addNewStage =async (params:type) => {

  //         const newStagesData = {
  //             title: newStageTitle;

  //         };
  // }

  // const createNewStageAPI = async (newStageData: StageProps) => {
  //   const res = await axios.post(
  //     `${API_URL}/stages/create/${params.projectId}`,
  //     newStageData,
  //   );

  //   return res.data;
  // };
  // const createNewStage = async (newStagesData: ProjectProps) => {
  //   const createStage = await createNewStageAPI({...newStagesData,title: params.projectId});
  // };

  return (
    <div className="flex flex-row py-10 h-[90%] w-full overflow-x-scroll">
      {project.stages?.map((stage, index) => (
        <SingleStage key={index} stage={stage} />
      ))}
      <CustomButton
        containerStyles="mt-20 mx-10 min-w-[20%] h-[80%] rounded-lg border border-black justify-between text-6xl"
        handleClick={openStageForm}
        title="+"
      ></CustomButton>
      {isStageFormOpen && (
        <StageCreationForm onClose={closeStageForm} projectId={project} />
      )}
    </div>
  );
};

export default ListStages;
