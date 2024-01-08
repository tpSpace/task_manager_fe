import React, { useState } from 'react';

import SingleStage from './SingleStage';
import StageCreationForm from './StageCreateForm';

import CustomButton from '@/components/CustomButton';
import { ProjectProps, StageProps } from '@/types';

interface ListStagesProps {
  project: ProjectProps;
  setStageChangingFlag: () => void;
  selectedTag: string;
}
const ListStages = ({
  project,
  setStageChangingFlag,
  selectedTag,
}: ListStagesProps) => {
  const [isStageFormOpen, setIsStageFormOpen] = useState(false);

  const openStageForm = () => {
    setIsStageFormOpen(true);
  };

  const closeStageForm = () => {
    setIsStageFormOpen(false);
  };

  return (
    <div className="flex flex-row pb-10 h-[90%] w-full overflow-x-scroll">
      {project.stages?.map((stage, index) => (
        <SingleStage
          key={index}
          selectedTag={selectedTag}
          setStageChangingFlag={setStageChangingFlag}
          stage={stage}
          tags={project.tags}
        />
      ))}
      <CustomButton
        containerStyles="mt-20 mx-10 min-w-[20%] h-[80%] rounded-lg border border-black justify-between text-6xl"
        handleClick={openStageForm}
        title="+"
      ></CustomButton>
      {isStageFormOpen && (
        <StageCreationForm
          onClose={closeStageForm}
          projectId={project}
          setStageChangingFlag={setStageChangingFlag}
        />
      )}
    </div>
  );
};

export default ListStages;
