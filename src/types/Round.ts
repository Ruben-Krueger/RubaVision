import Direction from './Direction';
import Emotion from './Emotion';
import Position from './Position';

type Round = {
  index: number;
  startTimestamp: number;
  endTimestamp: number;
  guess: Direction | Emotion | null;
  answer: Direction | Emotion;
  targetCenter: Position;
};

export default Round;
