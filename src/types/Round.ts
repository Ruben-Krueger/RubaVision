import Direction from './Direction';

type Round = {
  startMS: number;
  endMS: number;
  guess: Direction | null;
  answer: Direction;
};

export default Round;
