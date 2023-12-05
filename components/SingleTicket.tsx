import React from 'react';

import { TicketProps } from '@/types';

interface SingleTicketProps {
  ticket: TicketProps;
}

const SingleTicket = ({ ticket }: SingleTicketProps) => {
  return (
    <div>
      <h1>{ticket.title}</h1>
      <p>{ticket.description}</p>
    </div>
  );
};

export default SingleTicket;
