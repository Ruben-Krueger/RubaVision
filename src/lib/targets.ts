import P5 from 'p5';

import getRandomInt from '../util/getRandomInt';
import Position from '../types/Position';
import getDistance from '../util/getDistance';
import GameMode from '../types/GameMode';
import nullThrows from 'capital-t-null-throws';

const DOT_COUNT = 20;
const BOUNDARY_DIAMETER = 200;
const BOUNDARY_RADIUS = BOUNDARY_DIAMETER / 2;
const TARGET_DIAMETER = 10;
const EMOTIONAL_STIMULI_IMAGE_WIDTH = 100;

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
  gameMode: GameMode;

  sadImage: P5.Image | null;
  happyImage: P5.Image | null;

  constructor(
    p5: P5,
    gameMode: GameMode,
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

    this.gameMode = gameMode;

    this.jitter = jitter;

    p5.preload = () => {
      if (this.gameMode !== GameMode.EMOTION) return;

      this.sadImage = p5.loadImage('assets/happy-baby.jpg');
      this.happyImage = p5.loadImage('assets/happy-baby.jpg');
    };
  }

  draw() {
    if (this.gameMode === GameMode.STANDARD) {
      this.drawTargets();
      this.drawBoundary();
    } else {
      this.drawEmotionalStimuli();
    }
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

  drawEmotionalStimuli() {
    this.p5.image(
      nullThrows(this.sadImage),
      this.boundaryPosition.x,
      this.boundaryPosition.y,
      EMOTIONAL_STIMULI_IMAGE_WIDTH,
      EMOTIONAL_STIMULI_IMAGE_WIDTH
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
    if (this.gameMode === GameMode.STANDARD) this.updateTargets();
  }

  reset(newDirection: number | null) {
    if (newDirection) {
      this.velocity = newDirection;
    }

    this.positions = Array.from({ length: DOT_COUNT }, () =>
      getInitialTargetPosition(this.boundaryPosition)
    );
  }

  moveTargets(newDirection?: number | null) {
    if (newDirection) {
      this.velocity = newDirection;
    }

    this.boundaryPosition = getNewBoundaryPosition();

    if (this.gameMode === GameMode.STANDARD) {
      this.positions = Array.from({ length: DOT_COUNT }, () =>
        getInitialTargetPosition(this.boundaryPosition)
      );
    }
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
