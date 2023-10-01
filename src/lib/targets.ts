import P5 from 'p5';

import getRandomInt from '../util/getRandomInt';

const DOT_COUNT = 20;

type Position = {
  x: number;
  y: number;
};

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

  constructor(centerX: number, centerY: number, p5: P5) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.p5 = p5;

    this.positions = Array.from({ length: DOT_COUNT }, () =>
      getInitialPosition(this.centerX, this.centerX)
    );
  }

  draw() {
    this.drawTargets();
    this.drawBoundary();
  }

  drawBoundary() {
    this.p5.circle(this.centerX, this.centerX, 200);
  }

  drawTargets() {
    for (let i = 0; i < this.positions.length; i++) {
      this.p5.fill(51);
      this.p5.circle(this.positions[i].x, this.positions[i].y, 10);
      this.p5.noFill();
    }
  }

  update() {
    this.updateTarget();
  }

  updateTarget() {
    for (let i = 0; i < this.positions.length; i++) {
      this.positions[i].x = this.positions[i].x + 1;
      this.positions[i].y = this.positions[i].y + getRandomInt(-1, 1);
    }
  }
}

export default Targets;
