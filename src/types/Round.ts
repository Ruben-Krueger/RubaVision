import Direction from './Direction';
import Position from './Position';

type Round = {
  index: number;
  startTimestamp: number;
  endTimestamp: number;
  guess: Direction | null;
  answer: Direction;
  targetCenter: Position;
};

export default Round;
