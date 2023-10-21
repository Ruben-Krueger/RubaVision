import Direction from './Direction';
import Position from './Position';

type Round = {
  startTimestamp: number;
  endTimestamp: number;
  guess: Direction | null;
  answer: Direction;
  targetCenter: Position;
};

export default Round;
