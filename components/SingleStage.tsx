import { StageProps } from '@/types';
import TicketCard from './TicketCard';

interface SingleStageProps {
  stage: StageProps;
}

const SingleStage = ({ stage }: SingleStageProps) => {
  return (
    <div>
      <h1>{stage.title}</h1>
      <div>
        {stage.tickets?.map((ticket, index) => (
          <TicketCard key={index} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default SingleStage;
