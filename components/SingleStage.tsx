import React from 'react';

import { StageProps } from '@/types';

const SingleStage = ({ title, tickets }: StageProps) => {
  const displayTicket = () => {
    return <>{tickets}</>;
  };

  return (
    <div>
      <h1>{title}</h1>
      {displayTicket()}
    </div>
  );
};

export default SingleStage;
