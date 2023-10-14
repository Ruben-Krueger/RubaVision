import P5 from 'p5';
import Targets from './targets';
let difficulty = 10;

// The time to guess the movement direction after a target is displayed
const ROUND_INTERVAL_MS = 1500;

let velocity = 1;

let CURRENT_ROUND_END_MS: number | null = null;

const NUMBER_OF_ROUNDS = 5;

type Direction = 'left' | 'right';

let direction: Direction = 'left';

type Round = {
  startMS: number;
  endMS: number;
  guess: Direction | null;
  answer: Direction;
};

let rounds: Round[] = [];

const sketch = (p5: P5) => {
  const targets = new Targets(p5, velocity);

  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);

    const now = Date.now();

    // Initialize round information
    for (let i = 0; i < NUMBER_OF_ROUNDS; i++) {
      const previousEnd = rounds[i - 1]?.endMS ?? now;
      rounds.push({
        startMS: previousEnd,
        endMS: previousEnd + ROUND_INTERVAL_MS,
        guess: null,
        answer: Math.random() > 0.5 ? 'left' : 'right',
      });
    }

    console.log(rounds);
  };

  p5.keyPressed = () => {
    const guess =
      p5.keyCode === p5.LEFT_ARROW
        ? 'left'
        : p5.keyCode === p5.RIGHT_ARROW
        ? 'right'
        : null;

    const now = Date.now();

    const round = rounds.find((r) => now > r.startMS && now < r.endMS);
    if (round) {
      round.guess = guess;
    }
  };

  p5.draw = () => {
    p5.background(255);
    drawFocusCircle();

    const now = Date.now();

    if (now >= rounds[rounds.length - 1].endMS) {
      p5.noLoop();
    }

    CURRENT_ROUND_END_MS = CURRENT_ROUND_END_MS ?? now + ROUND_INTERVAL_MS;

    const round = rounds.find((r) => now > r.startMS && now < r.endMS);

    if (now > CURRENT_ROUND_END_MS) {
      CURRENT_ROUND_END_MS = now + ROUND_INTERVAL_MS;
      const newVelocity = round?.answer === 'left' ? -1 : 1;
      targets.moveTargets(newVelocity);
    }

    targets.draw();
    targets.update();
  };

  function drawFocusCircle() {
    const radius = 20;
    p5.fill(51);
    p5.circle(p5.windowWidth / 2, p5.windowHeight / 2 - radius / 2, radius);
    p5.noFill();
  }
};

export default sketch;
