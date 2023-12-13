import React, { Fragment, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';

import SingleComment from './SingleComment';
import TicketCreationForm from './TicketCreationForm';

import { TicketProps } from '@/types';

interface SingleTicketProps {
  isOpen: boolean;
  closeModal: () => void;
  ticket: TicketProps;
}

const SingleTicket = ({ isOpen, ticket, closeModal }: SingleTicketProps) => {
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);

  const openTicketCreationForm = () => {
    setIsCreatingTicket(true);
  };

  const closeTicketCreationForm = () => {
    setIsCreatingTicket(false);
  };

  return (
    <>
      <Transition appear as={Fragment} show={isOpen}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          {/* Button to open the ticket creation form */}
          <button
            className="bg-primary-blue-500 text-white px-4 py-2 rounded-full hover:bg-primary-blue-600"
            onClick={openTicketCreationForm}
            type="button"
          >
            Create New Ticket
          </button>

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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-full max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex-col gap-5">
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

                  <div>
                    <h1>{ticket.title}</h1>
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
