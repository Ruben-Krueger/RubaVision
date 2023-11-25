import Position from './Position';
import Answer from './Answer';

type Round = {
  index: number;
  startTimestamp: number;
  endTimestamp: number;
  guess: Answer | null;
  answer: Answer;
  targetCenter: Position;
};

export default Round;
