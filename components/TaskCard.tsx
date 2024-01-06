'use client';

/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { set } from 'zod';

import SingleTicket from './SingleTicket';

import EditIcon from '../icons/EditIcon';
import TrashIcon from '../icons/TrashIcon';
import { Id, Task } from '../types/types';

import { TagProps } from '@/types';

interface Props {
  task: Task;
  deleteTask: (id: string) => void;
  updateTask: (id: string, content: string) => void;
  tags: TagProps[];
}

function TaskCard({ task, deleteTask, updateTask, tags }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode(prev => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        className="
        opacity-30
      bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
      "
        ref={setNodeRef}
        style={style}
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.ticket.title}
      </p>

      {mouseIsOver && (
        <button
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          type="button"
        >
          <EditIcon className="w-6 h-6" />
        </button>
      )}
      <SingleTicket
        closeModal={() => setIsOpen(false)}
        isOpen={isOpen}
        tags={tags}
        ticket={task.ticket}
      />
    </div>
  );
}

export default TaskCard;
