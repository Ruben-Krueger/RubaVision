import Position from '../types/Position';

export default function getDistance(
  position1: Position,
  position2: Position
): number {
  return Math.sqrt(
    Math.pow(position1.x - position2.x, 2) +
      Math.pow(position1.y - position2.y, 2)
  );
}
