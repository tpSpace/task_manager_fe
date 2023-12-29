// TicketCreationForm.tsx
import React, { ChangeEvent, useState } from 'react';

import axios from 'axios';

interface TicketCreationFormProps {
  onClose: () => void;
  stageId: string;
  setFlag: () => void;
}

const TicketCreationForm: React.FC<TicketCreationFormProps> = ({
  onClose,
  stageId,
  setFlag,
}) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewTicket(prevTicket => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Your form submission logic here
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/tickets/create/${stageId}`, newTicket, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log(err);
    }

    setFlag();
    console.log('New Ticket:', newTicket);
    // Close the form
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
            value={newTicket.title}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          type="submit"
        >
          Create Ticket
        </button>
      </form>
    </div>
  );
};

export default TicketCreationForm;
