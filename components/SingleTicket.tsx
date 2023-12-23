import React, { Fragment, useEffect, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import Image from 'next/image';

import SingleComment from './SingleComment';
import TicketCreationForm from './TicketCreationForm';

import { TicketProps } from '@/types';

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
          className="relative z-10 h-0 inset-0"
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

          <div className="fixed inset-0 overflow-hidden">
            <div className="flex min-h-full items-center justify-center px-6">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="relative w-full max-w-full h-[70vh] min-h-full max-h-[80vh] transform rounded-2xl bg-white text-left shadow-xl transition-all flex-col">
                  <div className="grid grid-cols-3 pt-2 px-2 border-black border-b-2 min-h-[10%]">
                    <button
                      className="absolute top-2 right-2 pt-2 z-10 bg-primary-blue-100 rounded-full"
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
                    <div className="self-center">Created by </div>
                    <input
                      className="text-4xl text-center font-bold overflow-auto"
                      onChange={e => handleChangeTitle(e.target.value)}
                      onBlur={e => {
                        setFlag();
                        handleChangeTitle(e.target.value);
                      }}
                      value={updatedTicket.title}
                    />
                  </div>

                  <div className="border-black border-t-2 grid grid-cols-3 px-2 min-h-[10%]">
                    <div className="self-center">Assignees: </div>
                    <div className="place-self-center">
                      Deadline:
                      {updatedTicket.deadline ? (
                        <span> 20-12-2023</span>
                      ) : (
                        <span> none</span>
                      )}
                    </div>
                    <div className="place-self-center">GAM</div>
                  </div>

                  <div className="grid grid-cols-3 w-full min-h-[80%]">
                    <div className="col-span-2">
                      <div className="grid grid-rows-3 min-h-full">
                        <div className="row-span-2 mr-1 ml-4 my-1 bg-gray-200 border-black border-2 rounded-2xl">
                          <h1 className="text-3xl font-semibold text-center">
                            Description
                          </h1>
                          <p>{updatedTicket.description}</p>
                        </div>

                        <div className="mr-1 ml-4 mt-1 mb-2 bg-gray-200 border-black border-2 rounded-2xl">
                          <h1 className="text-3xl font-semibold text-center">
                            Comments
                          </h1>
                          {updatedTicket.comments?.map((comment, index) => (
                            <SingleComment comment={comment} key={index} />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="ml-1 mr-4 mt-1 mb-2 bg-gray-200 border-black border-2 rounded-2xl">
                      <h1 className="text-3xl font-semibold text-center">
                        Relationship tree
                      </h1>
                    </div>
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
