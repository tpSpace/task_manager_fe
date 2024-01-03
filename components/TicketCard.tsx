import { useState } from 'react';

import CustomButton from './CustomButton';
import SingleTicket from './SingleTicket';

import { TagProps, TicketProps } from '@/types';

interface TicketCardProps {
  ticket: TicketProps;
  setFlag: () => void;
  tags: TagProps[];
}

const TicketCard = ({ ticket, setFlag, tags }: TicketCardProps) => {
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
      {/* <div>{ticket.tag?.title}</div> */}
      <div>
        {/* {ticket.assignees?.map((assignee, index) => (
            {assignee.avatar}
        ))} */}
      </div>

      <SingleTicket
        closeModal={() => setIsOpen(false)}
        isOpen={isOpen}
        setFlag={setFlag}
        tags={tags}
        ticket={ticket}
      />
    </div>
  );
};

export default TicketCard;
