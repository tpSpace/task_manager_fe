import React, { ChangeEvent, useState } from 'react';

import axios from 'axios';

import { ProjectProps, StageProps } from '@/types';

interface StageCreationFormProps {
  onClose: () => void;
  projectId: ProjectProps;
  setStageChangingFlag: () => void;
}

const StageCreationForm: React.FC<StageCreationFormProps> = ({
  onClose,
  projectId,
  setStageChangingFlag,
}) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [newStage, setNewStage] = useState<StageProps>({
    id: projectId.id,
    title: ' ',
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewStage(prevStage => ({
      ...prevStage,
      title: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    const stageData = {
      id: projectId.id,
      title: newStage.title,
    };
    axios
      .post(`${API_URL}/stages/create/${projectId.id}`, stageData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setStageChangingFlag();
        console.log(response.status, response.data.token);
      })
      .catch(err => {
        console.log(err);
      });
    onClose();
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create New Ticket</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title:
          </label>
          <input
            autoFocus
            className="mt-1 p-2 border rounded-md w-full"
            name="title"
            onChange={handleInputChange}
            type="text"
            value={newStage.title}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          type="submit"
        >
          Create Stage
        </button>
      </form>
    </div>
  );
};

export default StageCreationForm;
