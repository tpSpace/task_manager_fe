import React from 'react';

import { TicketProps } from '@/types';

const SingleTicket = (ticket: TicketProps) => {
  return (
    <div>
      <h1>{ticket.title}</h1>
      <p></p>
    </div>
  );
};

export default SingleTicket;
