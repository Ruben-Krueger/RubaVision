import P5 from 'p5';
import Targets from './targets';
import Round from '../types/Round';
import storeResults from '../util/storeResults';
import getLocalStorage from '../util/getLocalStorage';
import GameMode from '../types/GameMode';
import Direction from '../types/Direction';
import Emotion from '../types/Emotion';

let rounds: Round[] = [];

const KEYS_TO_ANSWER: { [key: number]: Direction | Emotion } = {
  37: Direction.LEFT,
  39: Direction.RIGHT,
  83: Emotion.SAD,
  72: Emotion.HAPPY,
};

const sketch = (p5: P5) => {
  const HAS_EMOTIONAL_STIMULI = getLocalStorage('emotional-stimuli', false);

  const GAME_MODE = HAS_EMOTIONAL_STIMULI
    ? GameMode.EMOTION
    : GameMode.STANDARD;

  // The time to guess the movement direction after a target is displayed
  const ROUND_INTERVAL_MS = getLocalStorage('round-length', 1) * 1000;
  const { x, y } = getLocalStorage('target-center', { x: 0, y: 0 });

  const HAS_MOVING_TARGETS = getLocalStorage('has-moving-target-center', true);
  const NUMBER_OF_ROUNDS = getLocalStorage('number-rounds', 5);

  let velocity = 1;
  let CURRENT_ROUND_END_MS: number | null = null;
  const TARGET_CENTER = { x: x * window.innerWidth, y: y * window.innerHeight };

  const targets = new Targets(
    p5,
    GAME_MODE,
    velocity,
    HAS_MOVING_TARGETS ? null : TARGET_CENTER
  );

  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);

    const now = Date.now();

    // Initialize round information
    for (let i = 0; i < NUMBER_OF_ROUNDS; i++) {
      const elements =
        GAME_MODE === GameMode.EMOTION
          ? Object.values(Emotion)
          : Object.values(Direction);

      const answer = Math.random() > 0.5 ? elements[0] : elements[1];

      const previousEnd = rounds[i - 1]?.endTimestamp ?? now;
      rounds.push({
        index: i,
        startTimestamp: previousEnd,
        endTimestamp: previousEnd + ROUND_INTERVAL_MS,
        guess: null,
        answer,
        targetCenter: targets.getTargetCenter(),
      });
    }
  };

  p5.keyPressed = () => {
    // End the game using "q"
    if (p5.keyCode === 81) {
      storeResults(rounds);
      window.location.href = '/end';
    }

    const guess = KEYS_TO_ANSWER[p5.keyCode];

    const now = Date.now();

    const round = rounds.find(
      (r) => now > r.startTimestamp && now < r.endTimestamp
    );

    // This overwrites previous guesses
    if (round) {
      round.guess = guess;
    }
  };

  p5.draw = () => {
    p5.background(255);
    drawFocusCircle();

    const now = Date.now();

    // Game has ended
    if (now >= rounds[rounds.length - 1].endTimestamp) {
      p5.noLoop();

      storeResults(rounds);

      window.location.href = '/end';
    }

    CURRENT_ROUND_END_MS = CURRENT_ROUND_END_MS ?? now + ROUND_INTERVAL_MS;

    const round = rounds.find(
      (r) => now > r.startTimestamp && now < r.endTimestamp
    );

    if (now > CURRENT_ROUND_END_MS) {
      CURRENT_ROUND_END_MS = now + ROUND_INTERVAL_MS;

      const newVelocity =
        GAME_MODE === GameMode.EMOTION
          ? null
          : round?.answer === Direction.LEFT
          ? -1
          : 1;

      if (HAS_MOVING_TARGETS) {
        targets.moveTargets(newVelocity);
      } else {
        targets.reset(newVelocity);
      }
    }

    targets.draw(round?.answer);
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
