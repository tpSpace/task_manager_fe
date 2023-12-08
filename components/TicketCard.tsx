import { useState } from 'react';

import CustomButton from './CustomButton';
import SingleTicket from './SingleTicket';

import { TicketProps } from '@/types';

interface TicketCardProps {
  ticket: TicketProps;
}

const TicketCard = ({ ticket }: TicketCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>
        <CustomButton
          containerStyles="font-semibold text-xl"
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
        isOpen={isOpen}
        ticket={ticket}
      />
    </div>
  );
};

export default TicketCard;
