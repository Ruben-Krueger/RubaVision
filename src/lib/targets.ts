import P5 from 'p5';

import getRandomInt from '../util/getRandomInt';
import Position from '../types/Position';
import getDistance from '../util/getDistance';

const DOT_COUNT = 20;
const BOUNDARY_DIAMETER = 200;
const BOUNDARY_RADIUS = BOUNDARY_DIAMETER / 2;
const TARGET_DIAMETER = 10;

function getInitialTargetPosition(centerPosition: Position): Position {
  return {
    x: centerPosition.x + getRandomInt(-BOUNDARY_RADIUS, BOUNDARY_RADIUS),
    y: centerPosition.y + getRandomInt(-BOUNDARY_RADIUS, BOUNDARY_RADIUS),
  };
}

function getNewBoundaryPosition(): Position {
  return {
    x: getRandomInt(BOUNDARY_RADIUS, window.innerWidth - BOUNDARY_RADIUS),
    y: getRandomInt(BOUNDARY_RADIUS, window.innerHeight - BOUNDARY_RADIUS),
  };
}

class Targets {
  boundaryPosition: Position;
  p5: P5;
  positions: Position[];
  velocity: number;
  jitter: number;

  constructor(
    p5: P5,
    velocity: number,
    targetCenter?: Position | null,
    jitter = 5
  ) {
    this.p5 = p5;

    this.boundaryPosition = targetCenter ?? getNewBoundaryPosition();

    this.positions = Array.from({ length: DOT_COUNT }, () =>
      getInitialTargetPosition(this.boundaryPosition)
    );

    this.velocity = velocity;

    this.jitter = jitter;
  }

  draw() {
    this.drawTargets();
    this.drawBoundary();
  }

  getTargetCenter(): Position {
    return { x: this.boundaryPosition.x, y: this.boundaryPosition.y };
  }

  drawBoundary() {
    this.p5.circle(
      this.boundaryPosition.x,
      this.boundaryPosition.y,
      BOUNDARY_DIAMETER
    );
  }

  drawTargets() {
    for (let i = 0; i < this.positions.length; i++) {
      this.p5.fill(51);
      this.p5.circle(this.positions[i].x, this.positions[i].y, TARGET_DIAMETER);
      this.p5.noFill();
    }
  }

  update() {
    this.updateTargets();
  }

  reset(newDirection: number) {
    this.velocity = newDirection;

    this.positions = Array.from({ length: DOT_COUNT }, () =>
      getInitialTargetPosition(this.boundaryPosition)
    );
  }

  moveTargets(newDirection: number) {
    this.velocity = newDirection;

    this.boundaryPosition = getNewBoundaryPosition();

    this.positions = Array.from({ length: DOT_COUNT }, () =>
      getInitialTargetPosition(this.boundaryPosition)
    );
  }

  updateTargets() {
    const newPositions = this.positions
      .map((position) => ({
        x: position.x + this.velocity,
        y: position.y + getRandomInt(-this.jitter, this.jitter),
      }))
      .filter(
        (target) => getDistance(target, this.boundaryPosition) < BOUNDARY_RADIUS
      );

    this.positions = newPositions;
  }
}

export default Targets;
