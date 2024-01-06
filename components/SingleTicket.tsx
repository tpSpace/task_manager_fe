import React, { Fragment, useEffect, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';

import SingleComment from './SingleComment';
import Tag from './Tag';

import { TagProps, TicketProps } from '@/types';

interface SingleTicketProps {
  isOpen: boolean;
  closeModal: () => void;
  ticket: TicketProps;
  setFlag?: (() => void) | undefined;
  tags: TagProps[];
}

const SingleTicket = ({
  isOpen,
  ticket,
  closeModal,
  setFlag,
  tags,
}: SingleTicketProps) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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

  const handleChangeTitle = (title: string) => {
    setUpdatedTicket(prevTicket => ({
      ...prevTicket,
      title: title,
    }));
  };

  const handleChangeDescription = (description: string) => {
    setUpdatedTicket(prevTicket => ({
      ...prevTicket,
      description: description,
    }));
  };

  const handleChangeDeadline = (date: Date) => {
    setUpdatedTicket(prevTicket => ({
      ...prevTicket,
      deadline: date.toISOString(),
    }));
  };

  const handleDeleteTicket = async () => {
    const token = localStorage.getItem('token');
    try {
      axios.delete(`${API_URL}/tickets/delete/${ticket.ticketId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Ticket deleted successfully');
      if (typeof setFlag === 'function') {
        setFlag();
      }
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelect = async (selected: string) => {
    // replace with your actual handle select function
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `${API_URL}/tickets/update/${ticket.ticketId}`,
        {
          // update the tag
          tag: selected,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Ticket updated successfully');
      // update the selected tag in the state
      setSelectedTag(selected);
      // save the selected tag in localStorage
      localStorage.setItem(`selectedTag-${ticket.ticketId}`, selected);
    } catch (err) {
      console.log(err);
    }
    console.log(selected);
  };

  useEffect(() => {
    const savedTag = localStorage.getItem(`selectedTag-${ticket.ticketId}`);
    if (savedTag) {
      setSelectedTag(savedTag);
    }
  }, [ticket.ticketId]);

  const loadTicket = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `${API_URL}/tickets/update/${ticket.ticketId}`,
        updatedTicket,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (typeof setFlag === 'function') {
        setFlag();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Transition appear as={Fragment} show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10 h-0 inset-0"
          onClose={closeModal}
        >
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
                    <div className="self-center">Created by </div>
                    <input
                      className="text-3xl text-center font-bold focus:outline-0"
                      onBlur={() => {
                        loadTicket();
                      }}
                      onChange={e => handleChangeTitle(e.target.value)}
                      value={updatedTicket.title}
                    />
                    <div className="flex flex-row justify-end items-center">
                      <MdDelete
                        className="mx-2 z-10 text-2xl hover:text-4xl cursor-pointer text-black"
                        onClick={handleDeleteTicket}
                      />
                      <button
                        className="px-2 z-10 rounded-full"
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
                    </div>
                  </div>

                  <div className="border-black border-t-2 grid grid-cols-3 px-2 min-h-[10%]">
                    <div className="self-center">Assignees: </div>
                    <div className="place-self-center">
                      Deadline:
                      <input
                        onBlur={() => {
                          loadTicket();
                          if (typeof setFlag === 'function') {
                            setFlag();
                          }
                        }}
                        onChange={e =>
                          handleChangeDeadline(e.target.valueAsDate!)
                        }
                        type="date"
                        value={`${updatedTicket.deadline?.slice(0, 10)}`}
                      />
                    </div>
                    <div className="place-self-center">
                      {/* Display tag title as a select menu */}
                      <Tag
                        handleSelect={handleSelect}
                        selectedTag={selectedTag}
                        tags={tags}
                      />
                      {/* {selectedTag && <div>Tag: {selectedTag}</div>} */}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 w-full min-h-[80%]">
                    <div className="col-span-2">
                      <div className="grid grid-rows-3 min-h-full">
                        <div className="row-span-2 mr-1 ml-4 my-1 bg-gray-200 border-black border-2 rounded-2xl">
                          <h1 className="text-3xl font-semibold text-center">
                            Description
                          </h1>
                          <textarea
                            className="w-full h-[80%] bg-gray-200 focus:outline-0 pl-1 resize-none"
                            onBlur={e => {
                              loadTicket();
                            }}
                            onChange={e =>
                              handleChangeDescription(e.target.value)
                            }
                            placeholder="Some descriptions for the task"
                            value={updatedTicket.description}
                          />
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
