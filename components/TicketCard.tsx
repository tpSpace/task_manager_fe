import { TicketProps } from '@/types';
import SingleTicket from './SingleTicket';
import { useState } from 'react';
import CustomButton from './CustomButton';

interface TicketCardProps {
  ticket: TicketProps;
}

const TicketCard = ({ ticket }: TicketCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div>
        <CustomButton
          title={ticket.title}
          containerStyles="font-semibold text-xl"
          handleClick={() => setIsOpen(true)}
        />
      </div>
      <div>{ticket.tag?.title}</div>
      <div>
        {/* {ticket.assignees?.map((assignee, index) => (
            {assignee.avatar}
        ))} */}
      </div>

      <SingleTicket
        ticket={ticket}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      />
    </div>
  );
};

export default TicketCard;
