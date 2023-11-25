import P5 from 'p5';

import getRandomInt from '../util/getRandomInt';
import Position from '../types/Position';
import getDistance from '../util/getDistance';
import GameMode from '../types/GameMode';
import nullThrows from 'capital-t-null-throws';
import Direction from '../types/Direction';
import Emotion from '../types/Emotion';
import Answer from '../types/Answer';
import Shape from '../types/Shape';
import Color from '../types/Color';

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

  targetCenters: Position[] | null;
  targetIndex: number;

  constructor(
    p5: P5,
    gameMode: GameMode,
    velocity: number,
    targetCenters?: Position[] | null,
    jitter = 5
  ) {
    this.p5 = p5;

    if (targetCenters) {
      this.boundaryPosition = targetCenters[0];
      this.targetCenters = targetCenters;
      this.targetIndex = 0;
    } else {
      this.boundaryPosition = getNewBoundaryPosition();
    }

    this.positions = Array.from({ length: DOT_COUNT }, () =>
      getInitialTargetPosition(this.boundaryPosition)
    );

    this.velocity = velocity;

    this.gameMode = gameMode;

    this.jitter = jitter;

    p5.preload = () => {
      if (this.gameMode !== GameMode.EMOTION) return;

      this.sadImage = p5.loadImage('assets/sad-baby.PNG');
      this.happyImage = p5.loadImage('assets/happy-baby.jpg');
    };
  }

  draw(stimuli: Answer) {
    if (this.gameMode === GameMode.STANDARD) {
      this.drawTargets();
      this.drawBoundary();
    } else if (this.gameMode === GameMode.EMOTION) {
      // I know this is hacky but I don't have a reviewer to require this to be better ha
      this.drawEmotionalStimuli(stimuli as unknown as Emotion);
    } else if (this.gameMode === GameMode.COLORS) {
      this.drawColors(stimuli as unknown as Color);
    } else if (this.gameMode === GameMode.SHAPES) {
      this.drawShapes(stimuli as unknown as Shape);
    }
  }

  drawColors(stimuli: Color) {
    this.p5.fill(
      stimuli === Color.GREEN
        ? 'green'
        : stimuli === Color.RED
        ? 'red'
        : 'yellow'
    );
    this.p5.noStroke();
    this.p5.circle(this.boundaryPosition.x, this.boundaryPosition.y, 60);
    this.p5.noFill();
  }

  drawShapes(stimuli: Shape) {
    this.p5.fill(51);
    switch (stimuli) {
      case Shape.CIRCLE:
        this.p5.circle(this.boundaryPosition.x, this.boundaryPosition.y, 60);
        break;
      case Shape.TRIANGLE:
        this.p5.triangle(
          this.boundaryPosition.x - 30,
          this.boundaryPosition.y + 30,
          this.boundaryPosition.x + 30,
          this.boundaryPosition.y + 30,
          this.boundaryPosition.x,
          this.boundaryPosition.y - 30
        );
        break;
      case Shape.SQUARE:
        this.p5.rect(
          this.boundaryPosition.x - 60 / 2,
          this.boundaryPosition.y - 60 / 2,
          60,
          60
        );
        break;
    }
    this.p5.noFill();
  }

  getTargetCenter(): Position {
    return this.targetCenters?.[this.targetIndex] ?? this.boundaryPosition;
  }

  drawBoundary() {
    this.p5.circle(
      this.boundaryPosition.x,
      this.boundaryPosition.y,
      BOUNDARY_DIAMETER
    );
  }

  drawEmotionalStimuli(stimuli: Emotion) {
    const image = nullThrows(
      stimuli === Emotion.HAPPY ? this.happyImage : this.sadImage
    );

    this.p5.image(
      image,
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

  moveCenter(newPosition: Position) {
    this.boundaryPosition = newPosition;
  }

  moveTargets(newDirection?: number | null) {
    if (newDirection) {
      this.velocity = newDirection;
    }

    // Move the target center
    if (this.targetCenters) {
      this.targetIndex = this.targetIndex + 1;

      this.boundaryPosition =
        this.targetCenters[this.targetIndex % this.targetCenters.length];
    } else {
      this.boundaryPosition = getNewBoundaryPosition();
    }

    // Populate circles
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
