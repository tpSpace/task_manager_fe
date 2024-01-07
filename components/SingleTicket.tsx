import React, { Fragment, useEffect, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import Image from 'next/image';
import { AiOutlineEnter } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

import SingleComment from './SingleComment';
import Tag from './Tag';

import { CommentProps, TagProps, TicketProps } from '@/types';

interface SingleTicketProps {
  isOpen: boolean;
  closeModal: () => void;
  ticket: TicketProps;
  setFlag: () => void;
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

  const [comment, setComment] = useState<CommentProps>({
    id: '',
    commenter: {
      name: '',
      id: '',
    },
    content: '',
  });

  const [comments, setComments] = useState<CommentProps[]>([]);

  // initialize the ticket when the pop-up shown
  useEffect(() => {
    const token = localStorage.getItem('token');

    const initTicket = async () => {
      await axios
        .get(`${API_URL}/tickets/get/ticket/${ticket.ticketId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          if (res.status === 200) {
            console.log(res.data);
            setUpdatedTicket(res.data.ticket);
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    initTicket();
  }, [ticket.ticketId]);

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
    await axios
      .delete(`${API_URL}/tickets/delete/${ticket.ticketId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        closeModal();
        if (res.status === 200) {
          console.log(`Ticket ${ticket.title} deleted sucessfully`);
          setFlag();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSelect = async (selected: string) => {
    // replace with your actual handle select function
    setUpdatedTicket(prevTicket => ({
      ...prevTicket,
      tag: tags.find(tag => tag.title === selected),
    }));
    console.log(selected);
  };

  const handleComment = (content: string) => {};

  const loadTicket = async () => {
    const token = localStorage.getItem('token');

    await axios
      .put(`${API_URL}/tickets/update/${ticket.ticketId}`, updatedTicket, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          setFlag();
          console.log(`Ticket ${ticket.title} updated`);
        }
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
          onClose={() => {
            closeModal();
            loadTicket();
          }}
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
                    <div className="self-center">
                      Created by {updatedTicket.creator.name}
                    </div>
                    <input
                      autoFocus={false}
                      className="text-3xl text-center font-bold focus:outline-0"
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
                        onClick={() => {
                          loadTicket();
                          closeModal();
                        }}
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
                        selectedTag={updatedTicket.tag?.title ?? null}
                        tags={tags}
                      />
                      {/* {selectedTag && <div>Tag: {selectedTag}</div>} */}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 w-full min-h-[80%]">
                    <div className="col-span-2 p-0 m-0">
                      <div className="grid grid-rows-5 min-h-full">
                        <div className="row-span-3 mr-1 ml-4 my-1 bg-gray-200 border-black border-2 rounded-2xl">
                          <h1 className="text-2xl font-semibold text-center">
                            Description
                          </h1>
                          <textarea
                            className="w-full h-[80%] bg-gray-200 focus:outline-0 pl-1 resize-none"
                            onChange={e =>
                              handleChangeDescription(e.target.value)
                            }
                            placeholder="Some descriptions for the task"
                            value={updatedTicket.description}
                          />
                        </div>

                        <div className="row-span-2 h-[90%] mr-1 ml-4 mt-1 mb-4">
                          <div className="h-full grid grid-rows-4 place-items-center bg-gray-200 border-black border-2 rounded-2xl">
                            <h1 className="text-2xl font-semibold text-center max-h-[60%]">
                              Comments
                            </h1>
                            <div className="row-span-2 min-h-[full] overflow-y-auto">
                              {updatedTicket.comments?.map((comment, index) => (
                                <SingleComment comment={comment} key={index} />
                              ))}
                            </div>

                            <form className="w-[80%] flex justify-center px-2">
                              <textarea
                                className="w-[80%] resize-none h-8 border-black border-2 rounded-3xl px-2"
                                onChange={e => handleComment(e.target.value)}
                                placeholder="Add a comment"
                              />
                              <button
                                className="border-black border-2 rounded-full max-w-[10%] h-full self-center hover:bg-black hover:text-white"
                                type="submit"
                              >
                                <AiOutlineEnter className="w-full h-full" />
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="h-[96%] ml-1 mr-4 mt-1 mb-3 bg-gray-200 border-black border-2 rounded-2xl">
                      <h1 className="text-2xl font-semibold text-center">
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
