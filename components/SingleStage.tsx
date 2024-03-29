// SingleStage.tsx
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { MdDelete } from 'react-icons/md';

import TicketCard from './TicketCard';
import TicketCreationForm from './TicketCreationForm';

import CustomButton from '@/components/CustomButton';
import { StageProps, TagProps, TicketProps } from '@/types';

interface SingleStageProps {
  stage: StageProps;
  setStageChangingFlag: () => void;
  tags: TagProps[];
  selectedTag: string;
}

const SingleStage: React.FC<SingleStageProps> = ({
  stage,
  setStageChangingFlag,
  tags,
  selectedTag,
}) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [flag, setFlag] = useState<boolean>(true);

  const [isTicketFormOpen, setIsTicketFormOpen] = useState(false);

  const [updatedStage, setUpdatedStage] = useState<StageProps>({
    id: stage.id,
    title: stage.title,
    tickets: stage.tickets,
  });

  const [allTickets, setAllTickets] = useState<TicketProps[]>([]);

  useEffect(() => {
    reloadTickets();
  }, [flag]);

  useEffect(() => {
    handleSortTickets();
  }, [selectedTag]);

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
        setStageChangingFlag();
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

  const reloadTickets = async () => {
    const token = localStorage.getItem('token');

    await axios
      .get(`${API_URL}/tickets/get/stage/${stage.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(responses => {
        console.log(`Stage ${stage.title}'s tickets reloaded`);

        const newTickets = responses.data.tickets as TicketProps[];

        setUpdatedStage({
          ...updatedStage,
          tickets: newTickets,
        });

        setAllTickets(newTickets);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSortTickets = () => {
    console.log(allTickets);
    if (selectedTag === '+') return;
    else if (selectedTag !== 'All') {
      const sortedTickets = allTickets.filter(ticket => {
        return ticket.tag?.title === selectedTag;
      });
      console.log('selected Tag:', selectedTag);
      setUpdatedStage(prevStage => ({
        ...prevStage,
        tickets: sortedTickets,
      }));
    } else {
      console.log('selected Tag: All');
      setUpdatedStage(prevStage => ({
        ...prevStage,
        tickets: allTickets,
      }));
    }
  };

  return (
    <div className="mt-20 mx-10 w-[20%] h-[80%] rounded-lg border border-black flex justify-between flex-col">
      <div className="w-full h-12 relative -top-5 flex items-center justify-center border bg-black rounded-full">
        <div className="mx-1 flex bg-inherit w-full rounded-full">
          <input
            className="text-white bg-inherit w-full ml-1 text-2xl rounded-full"
            onBlur={updateStage}
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
        {updatedStage.tickets?.map((ticket, index) => (
          <TicketCard
            key={index}
            setFlag={() => setFlag(!flag)}
            tags={tags}
            ticket={ticket}
          />
        ))}
      </div>
      <div className="h-20 p-2 flex items-center justify-center">
        <CustomButton
          containerStyles="border-solid w-56 rounded-lg mb-16 h-20 text-6xl flex justify-center bg-gray-100 items-center"
          handleClick={() => setIsTicketFormOpen(true)}
          title="+"
        />
      </div>
      {/* Ticket Creation Form */}
      {isTicketFormOpen && (
        <TicketCreationForm
          onClose={() => setIsTicketFormOpen(false)}
          setFlag={() => setFlag(!flag)}
          stageId={stage.id}
        />
      )}
    </div>
  );
};

export default SingleStage;
