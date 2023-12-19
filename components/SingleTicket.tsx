import React, { Fragment, useEffect, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';

import SingleComment from './SingleComment';
import TicketCreationForm from './TicketCreationForm';

import { TicketProps } from '@/types';
import axios from 'axios';

interface SingleTicketProps {
  isOpen: boolean;
  closeModal: () => void;
  ticket: TicketProps;
  flag: boolean;
  setFlag: () => void;
}

const SingleTicket = ({
  isOpen,
  ticket,
  closeModal,
  flag,
  setFlag,
}: SingleTicketProps) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [isCreatingTicket, setIsCreatingTicket] = useState(false);

  const [updatedTicket, setUpdatedTicket] = useState<TicketProps>({
    ticketId: ticket.ticketId,
    title: ticket.title,
    description: ticket.description,
    comments: ticket.comments,
    assignees: ticket.assignees,
    tag: ticket.tag,
    parent: ticket.parent,
    children: ticket.children,
    deadline: ticket.deadline,
    creator: ticket.creator,
  });

  useEffect(() => {
    loadTicket();
  }, [flag]);

  const closeTicketCreationForm = () => {
    setIsCreatingTicket(false);
  };

  const handleChangeTitle = async (title: string) => {
    setUpdatedTicket(prevTicket => ({
      ...prevTicket,
      title: title,
    }));
  };

  const loadTicket = async () => {
    const token = localStorage.getItem('token');
    await axios
      .put(`${API_URL}/tickets/update/${ticket.ticketId}`, updatedTicket, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res.data.updatedTicket);
        const newTicket = res.data.updatedTicket;
        setUpdatedTicket({
          ...updatedTicket,
          ticketId: newTicket.ticketId,
          title: newTicket.title,
          description: newTicket.description,
          comments: newTicket.comments,
          assignees: newTicket.assignees,
          tag: newTicket.tag,
          parent: newTicket.parent,
          children: newTicket.children,
          deadline: newTicket.deadline,
          creator: newTicket.creator,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Transition appear as={Fragment} show={isOpen}>
        <Dialog
          as="div"
          className="relative border-black border-2 h-0 inset-0"
          onClose={closeModal}
        >
          {/* Ticket creation form */}
          {isCreatingTicket && (
            <TicketCreationForm onClose={closeTicketCreationForm} stageId="" />
          )}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden border-black border-2">
            <div className="flex min-h-full items-center justify-center px-6 border-black border-2">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="relative w-full max-w-full h-[70vh] min-h-full max-h-[80vh] transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex-col border-black border-2">
                  <button
                    className="absolute top-2 right-2 z-10 w-fit pt-2 bg-primary-blue-100 rounded-full"
                    onClick={closeModal}
                    type="button"
                  >
                    <Image
                      alt="close"
                      className="object-contain"
                      height={20}
                      src="/close.svg"
                      width={20}
                    />
                  </button>

                  <div className="flex justify-center bg-gray-200">
                    <input
                      className="text-2xl text-center font-semibold bg-gray-200"
                      onChange={e => handleChangeTitle(e.target.value)}
                      onBlur={e => {
                        setFlag();
                        handleChangeTitle(e.target.value);
                      }}
                      value={updatedTicket.title}
                    />
                  </div>

                  <div>
                    <p>{ticket.description}</p>
                  </div>

                  <div>
                    {ticket.comments?.map((comment, index) => (
                      <SingleComment comment={comment} key={index} />
                    ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SingleTicket;
