'use client';

import { useMemo, useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { SortableContext, useSortable } from '@dnd-kit/sortable';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CSS } from '@dnd-kit/utilities';
import axios from 'axios';

import TaskCard from './TaskCard';

import PlusIcon from '../icons/PlusIcon';
import TrashIcon from '../icons/TrashIcon';
import { Column, Id, Task } from '../types/types';

import { TagProps } from '@/types';

interface Props {
  column: Column;
  deleteColumn: (id: string) => void;
  updateColumn: (id: string, title: string) => void;

  createTask: (columnId: string) => void;
  updateTask: (id: string, content: string) => void;
  deleteTask: (id: string) => void;
  tasks: Task[];
  tags: TagProps[];
}

const token = localStorage.getItem('token');
const API_URL = process.env.NEXT_PUBLIC_API_URL;

let newTitle = '';

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
  tags,
}: Props) {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map(task => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        className="
          bg-columnBackgroundColor
          opacity-40
          border-2
        border-pink-500
          w-[350px]
          h-[500px]
          max-h-[500px]
          rounded-md
          flex
          flex-col
        text-white
        "
        ref={setNodeRef}
        style={style}
      ></div>
    );
  }

  return (
    <div
      className="
      bg-mainBackgroundColor
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col
      text-white
      "
      ref={setNodeRef}
      style={style}
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        className="
          bg-mainBackgroundColor
          text-md
          h-[60px]
          cursor-grab
          rounded-md
          rounded-b-none
          p-3
          font-bold
          border-columnBackgroundColor
          border-4
          flex
          items-center
          justify-between
        "
        onClick={() => {
          setEditMode(true);
        }}
      >
        <div className="flex gap-2">
          <div
            className="
              flex
              justify-center
              items-center
              bg-columnBackgroundColor
              px-2
              py-1
              text-sm
              rounded-full
            "
          >
            0
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              autoFocus
              className="bg-black focus:border-rose-500 border rounded outline-none px-2"
              onBlur={() => {
                setEditMode(false);
              }}
              onChange={e => {
                updateColumn(column.id, e.target.value);
                newTitle = e.target.value;
              }}
              onKeyDown={e => {
                if (e.key !== 'Enter') return;

                const data = {
                  title: newTitle,
                };
                async function updateColumnTitle() {
                  await axios.put(
                    `${API_URL}/stages/updateTitle/${column.id}`,
                    data,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    },
                  );
                  console.log('update column title');
                }
                updateColumnTitle();
                setEditMode(false);
              }}
              value={column.title}
            />
          )}
        </div>
        <button
          aria-label="Delete column"
          className="
          stroke-gray-500
          hover:stroke-white
            hover:bg-columnBackgroundColor
            rounded
            px-1
            py-2
          "
          onClick={() => {
            deleteColumn(column.id);
          }}
          type="button"
        >
          <TrashIcon />
        </button>
      </div>

      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map(task => (
            <TaskCard
              deleteTask={deleteTask}
              key={task.id}
              tags={tags}
              task={task}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      {/* Column footer */}
      <button
        className="flex flex-row gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
        onClick={() => {
          createTask(column.id);
        }}
        type="button"
      >
        <PlusIcon className="w-7 h-7" />
        <p>Add task</p>
      </button>
    </div>
  );
}

export default ColumnContainer;
