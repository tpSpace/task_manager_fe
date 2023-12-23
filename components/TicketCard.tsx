import { useState } from 'react';

import CustomButton from './CustomButton';
import SingleTicket from './SingleTicket';

import { TicketProps } from '@/types';

interface TicketCardProps {
  ticket: TicketProps;
  flag: boolean;
  setFlag: () => void;
}

const TicketCard = ({ ticket, flag, setFlag }: TicketCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="relative">
        <CustomButton
          containerStyles="font-semibold text-xl border-solid w-56 rounded-lg mb-16 h-20 flex justify-center bg-gray-100 items-center"
          handleClick={() => setIsOpen(true)}
          title={ticket.title}
        />
      </div>
      <div>{ticket.tag?.title}</div>
      <div>
        {/* {ticket.assignees?.map((assignee, index) => (
            {assignee.avatar}
        ))} */}
      </div>

      <SingleTicket
        closeModal={() => setIsOpen(false)}
        flag={flag}
        isOpen={isOpen}
        setFlag={setFlag}
        ticket={ticket}
      />
    </div>
  );
};

export default TicketCard;
