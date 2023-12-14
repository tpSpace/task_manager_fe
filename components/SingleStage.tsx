// SingleStage.tsx
import React, { useState } from 'react';

import TicketCard from './TicketCard';
import TicketCreationForm from './TicketCreationForm';

import CustomButton from '@/components/CustomButton';
import { StageProps } from '@/types';

interface SingleStageProps {
  stage: StageProps;
}

const SingleStage: React.FC<SingleStageProps> = ({ stage }) => {
  const [isTicketFormOpen, setIsTicketFormOpen] = useState(false);

  const openTicketForm = () => {
    setIsTicketFormOpen(true);
  };

  const closeTicketForm = () => {
    setIsTicketFormOpen(false);
  };

  return (
    <div className="mt-20 mx-10 w-72 h-[30rem] rounded-lg border border-black flex justify-between flex-col">
      <div className="h-12 relative -top-5 flex items-center justify-center border rounded-full bg-black text-white text-2xl">
        {stage.title}
      </div>
      <div className="flex flex-col justify-between items-center overflow-x-hidden overflow-y-auto max-h-96">
        {stage.tickets?.map((ticket, index) => (
          <TicketCard key={index} ticket={ticket} />
        ))}
      </div>
      <div className="h-20 p-2 flex items-center justify-center">
        <CustomButton
          containerStyles="border-solid w-56 rounded-lg mb-16 h-20 text-6xl flex justify-center bg-gray-100 items-center"
          handleClick={openTicketForm}
          title="+"
        />
      </div>
      {/* Ticket Creation Form */}
      {isTicketFormOpen && (
        <TicketCreationForm onClose={closeTicketForm} stageId={stage.id} />
      )}
    </div>
  );
};

export default SingleStage;
