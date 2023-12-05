import React from 'react';

import SingleTicket from './SingleTicket';

import { StageProps } from '@/types';

interface SingleStageProps {
  stage: StageProps;
}

const SingleStage = ({ stage }: SingleStageProps) => {
  const displayTicket = () => {
    return (
      <div>
        {stage.tickets.map((ticket, index) => (
          <SingleTicket key={index} ticket={ticket} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>{stage.title}</h1>
      {displayTicket()}
    </div>
  );
};

export default SingleStage;
