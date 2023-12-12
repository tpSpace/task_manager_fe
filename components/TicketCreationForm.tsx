// TicketCreationForm.tsx
import React, { ChangeEvent, useState } from 'react';

interface TicketCreationFormProps {
  onClose: () => void;
  stageId: string;
}

const TicketCreationForm: React.FC<TicketCreationFormProps> = ({
  onClose,
  //stageId,
}) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Your form submission logic here
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
            className="mt-1 p-2 border rounded-md w-full"
            name="title"
            onChange={handleInputChange}
            type="text"
            value={newTicket.title}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            className="mt-1 p-2 border rounded-md w-full"
            name="description"
            onChange={handleInputChange}
            value={newTicket.description}
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
