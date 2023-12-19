import React from 'react';

import SingleStage from './SingleStage';

import CustomButton from '@/components/CustomButton';
import { ProjectProps, StageProps } from '@/types';

interface ListStagesProps {
  stages: StageProps[];
  project: ProjectProps;
  flag: boolean;
  setFlag: () => void;
}
const ListStages = ({ project, flag, setFlag }: ListStagesProps) => {
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
  function createNewStage() {}

  return (
    <div className="flex flex-row py-10 h-[90%] w-full overflow-x-scroll">
      {project.stages?.map((stage, index) => (
        <SingleStage key={index} stage={stage} flag={flag} setFlag={setFlag} />
      ))}
      <CustomButton
        containerStyles="mt-20 mx-10 min-w-[20%] h-[80%] rounded-lg border border-black justify-between text-6xl"
        handleClick={createNewStage}
        title="+"
      ></CustomButton>
    </div>
  );
};

export default ListStages;
