// SingleStage.tsx
import React, { useEffect, useState } from 'react';

import axios from 'axios';

import TicketCard from './TicketCard';
import TicketCreationForm from './TicketCreationForm';

import CustomButton from '@/components/CustomButton';
import { StageProps } from '@/types';

interface SingleStageProps {
  stage: StageProps;
}

const SingleStage: React.FC<SingleStageProps> = ({ stage }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [flag, setFlag] = useState<boolean>(true);

  const [updatedStage, setUpdatedStage] = useState<StageProps>({
    id: stage.id,
    title: stage.title,
    tickets: stage.tickets,
  });
  useEffect(() => {
    loadStage();
  }, [flag]);
  const updateStage = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.put(
        `${API_URL}/stages/updateTitle/${stage.id}`,
        updateStage,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }

    // .then(res => {
    //   console.log(res.data.updateStage);
    //   const newStage = res.data.updateStage;
    //   setUpdatedStage({
    //     ...updateStage,
    //     id: newStage.id,
    //     title: newStage.title,
    //     tickets: newStage.tickets,
    //   });
    // })
    // .catch(err => {
    //   console.log(err);
    // });
  };

  const loadStage = async () => {};

  const [isTicketFormOpen, setIsTicketFormOpen] = useState(false);

  const openTicketForm = () => {
    setIsTicketFormOpen(true);
  };

  const closeTicketForm = () => {
    setIsTicketFormOpen(false);
  };

  return (
    <div className="mt-20 mx-10 min-w-[20%] h-[80%] rounded-lg border border-black flex justify-between flex-col">
      <div className="h-12 relative -top-5 flex items-center justify-center border rounded-full bg-black text-white text-2xl">
        {stage.title}
      </div>
      <div className="flex flex-col justify-between items-center overflow-x-hidden overflow-y-auto max-h-96">
        {stage.tickets?.map((ticket, index) => (
          <TicketCard
            flag={flag}
            key={index}
            setFlag={() => setFlag(!flag)}
            ticket={ticket}
          />
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
        <TicketCreationForm
          onClose={closeTicketForm}
          stageId={stage.id}
          setFlag={() => setFlag(!flag)}
        />
      )}
    </div>
  );
};

export default SingleStage;
