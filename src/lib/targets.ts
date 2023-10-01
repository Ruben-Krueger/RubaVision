import P5 from 'p5';

import getRandomInt from '../util/getRandomInt';
import Position from '../types/Position';
import getDistance from '../util/getDistance';

const DOT_COUNT = 20;
const BOUNDARY_DIAMETER = 200;
const BOUNDARY_RADIUS = BOUNDARY_DIAMETER / 2;
const TARGET_DIAMETER = 10;

function getInitialPosition(centerX: number, centerY: number): Position {
  return {
    x: centerX + getRandomInt(-50, 50),
    y: centerY + getRandomInt(-50, 50),
  };
}

class Targets {
  centerX: number;
  centerY: number;
  p5: P5;
  positions: Position[];
  velocity: number;

  constructor(centerX: number, centerY: number, p5: P5, velocity: number) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.p5 = p5;

    this.positions = Array.from({ length: DOT_COUNT }, () =>
      getInitialPosition(this.centerX, this.centerX)
    );

    this.velocity = velocity;
  }

  draw() {
    this.drawTargets();
    this.drawBoundary();
  }

  drawBoundary() {
    this.p5.circle(this.centerX, this.centerY, BOUNDARY_DIAMETER);
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

  moveTargets() {
    this.centerX = getRandomInt(
      BOUNDARY_RADIUS,
      window.innerWidth - BOUNDARY_RADIUS
    );
    this.centerY = getRandomInt(
      BOUNDARY_RADIUS,
      window.innerHeight - BOUNDARY_RADIUS
    );

    this.positions = Array.from({ length: DOT_COUNT }, () =>
      getInitialPosition(this.centerX, this.centerX)
    );
  }

  updateTargets() {
    const newPositions = this.positions.map((position) => {
      const updatedX =
        getDistance(
          { x: position.x + this.velocity, y: position.y },
          { x: this.centerX, y: this.centerY }
        ) <
        BOUNDARY_DIAMETER / 2
          ? position.x + this.velocity
          : this.velocity;

      console.log(position);
      return {
        x: updatedX,
        y: position.y + getRandomInt(-2, 2),
      };
    });

    this.positions = newPositions;
  }
}

export default Targets;
