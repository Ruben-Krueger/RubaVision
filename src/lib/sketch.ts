import P5 from 'p5';
import Targets from './targets';

let difficulty = 10;

let target_center_X = 100;
let target_center_Y = 100;

// The time to guess the movement direction after a target is displayed
const SCORE_INTERVAL_MS = 2000;

let velocity = 1;

// The number of guesses recorded
let GUESSES_COUNT = 0;

// Timestamps (in miliseconds) of when guesses where recorded
const GUESSES_TIMESTAMPS: number[] = [];

let MOST_RECENT_ROUND_TIMESTAMP = null;

const sketch = (p5: P5) => {
  const targets = new Targets(target_center_X, target_center_Y, p5, velocity);

  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
  };

  p5.keyPressed = () => {
    if (p5.keyCode === p5.LEFT_ARROW) {
      console.log('left', Math.random());
    } else if (p5.keyCode === p5.RIGHT_ARROW) {
      console.log('right');
    } else if (p5.keyCode === 32) {
      targets.moveTargets();
    }
  };

  p5.draw = () => {
    p5.background(255);
    drawFocusCircle();
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