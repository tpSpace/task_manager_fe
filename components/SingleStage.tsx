// SingleStage.tsx
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { MdDelete } from 'react-icons/md';

import TicketCard from './TicketCard';
import TicketCreationForm from './TicketCreationForm';

import CustomButton from '@/components/CustomButton';
import { StageProps, TicketProps } from '@/types';

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

  const deleteStage = async () => {
    const token = localStorage.getItem('token');
    await axios
      .delete(`${API_URL}/stages/delete/${stage.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res.data);
        console.log('Delete stage successfully');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChangeStage = async (title: string) => {
    setUpdatedStage(prevStage => ({
      ...prevStage,
      title: title,
    }));
  };

  const updateStage = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.put(
        `${API_URL}/stages/updateTitle/${stage.id}`,
        updatedStage,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const loadStage = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/stages/get/stage/${stage.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const fetchedStage = response.data;
      const Tickets = loadTickets(token, stage.id);
      setUpdatedStage(prevStage => ({
        ...prevStage,
        title: fetchedStage.title,
        tickets: Tickets,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const loadTickets = async (token: string | null, stageId: string) => {
    try {
      const responses = await axios.get(
        `${API_URL}/tickets/get/stage/${stageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { tickets } = responses.data;

      return tickets;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  const [isTicketFormOpen, setIsTicketFormOpen] = useState(false);

  const openTicketForm = () => {
    setIsTicketFormOpen(true);
  };

  const closeTicketForm = () => {
    setIsTicketFormOpen(false);
  };

  return (
    <div className="mt-20 mx-10 w-[20%] h-[80%] rounded-lg border border-black flex justify-between flex-col">
      <div className="w-full h-12 relative -top-5 flex items-center justify-center border bg-black rounded-full">
        <div className="mx-1 flex bg-inherit w-full rounded-full">
          <input
            className="text-white bg-inherit w-full ml-1 text-2xl rounded-full"
            onBlur={e => {
              setFlag(!flag);
              handleChangeStage(e.target.value);
            }}
            onChange={e => handleChangeStage(e.target.value)}
            value={updatedStage.title}
          />
          <div>
            <MdDelete
              className="mr-1 text-3xl hover:text-4xl cursor-pointer text-white"
              onClick={deleteStage}
            />
          </div>
        </div>
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
