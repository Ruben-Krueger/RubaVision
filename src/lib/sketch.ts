import P5 from 'p5';
import Targets from './targets';
import Round from '../types/Round';
import storeResults from '../util/storeResults';
import getLocalStorage from '../util/getLocalStorage';
import GameMode from '../types/GameMode';
import Direction from '../types/Direction';
import Emotion from '../types/Emotion';
import correctBeep from '../sounds/correct.mp3';
import wrongBeep from '../sounds/wrong.mp3';
import roundBeep from '../sounds/round.mp3';
import Color from '../types/Color';
import Shape from '../types/Shape';
import _ from 'lodash';
import Answer from '../types/Answer';
import nullThrows from 'capital-t-null-throws';

const KEYS_TO_ANSWER: { [key: number]: Answer } = {
  // Left/right arrows
  37: Direction.LEFT,
  39: Direction.RIGHT,

  // s,h
  83: Emotion.SAD,
  72: Emotion.HAPPY,

  // 1, 2, 3
  49: Shape.CIRCLE,
  50: Shape.SQUARE,
  51: Shape.TRIANGLE,

  // 4, 5, 6
  52: Color.RED,
  53: Color.GREEN,
  54: Color.YELLOW,
};

/** Get a random answer for a round.
 *
 * @param gameMode
 * @returns A round answer
 */
function getNextAnswer(gameMode: GameMode): Answer {
  let options: Answer[] = [];

  switch (gameMode) {
    case GameMode.MOTION:
      options = Object.values(Direction);
      break;
    case GameMode.EMOTION:
      options = Object.values(Emotion);
      break;
    case GameMode.COLORS:
      options = Object.values(Color);
      break;
    case GameMode.SHAPES:
      options = Object.values(Shape);
      break;
  }

  return nullThrows(_.sample(options));
}

const correctSound = new Audio(correctBeep);
const wrongSound = new Audio(wrongBeep);
const roundSound = new Audio(roundBeep);

const sketch = (p5: P5) => {
  const GAME_MODE: GameMode = getLocalStorage('game-mode', GameMode.MOTION);

  // The time to guess the movement direction after a target is displayed
  const ROUND_INTERVAL_MS = getLocalStorage('round-length', 1) * 1000;

  const targetCenters = getLocalStorage('target-centers', [{ x: 0, y: 0 }]);

  const HAS_RANDOMLY_MOVING_TARGET_CENTERS = getLocalStorage(
    'has-moving-target-center',
    true
  );
  const NUMBER_OF_ROUNDS = getLocalStorage('number-rounds', 5);

  let CURRENT_ROUND_INDEX = 0;

  const now = Date.now();

  let rounds: Round[] = [];

  // Initialize round information
  for (let i = 0; i < NUMBER_OF_ROUNDS; i++) {
    const answer = getNextAnswer(GAME_MODE);

    const previousEnd = rounds[i - 1]?.endTimestamp ?? now;

    rounds.push({
      index: i,
      startTimestamp: previousEnd,
      endTimestamp: previousEnd + ROUND_INTERVAL_MS,
      guess: null,
      answer,
      targetCenter: targetCenters[i], // this may be overwritten
    });
  }

  const targets = new Targets(
    p5,
    GAME_MODE,
    HAS_RANDOMLY_MOVING_TARGET_CENTERS ? null : targetCenters
  );

  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
  };

  p5.keyPressed = () => {
    // Pause the game using "delete"
    if (p5.keyCode === 8) {
      p5.noLoop();
      return;
    }

    // Resume the game using "backspace"
    if (p5.keyCode === 13) {
      p5.loop();
    }

    // End the game using "q"
    if (p5.keyCode === 81) {
      storeResults(rounds);
      window.location.href = '/end';
    }

    const guess = KEYS_TO_ANSWER[p5.keyCode] ?? null;
    console.log('p5 keycode', p5.keyCode);
    console.log('guess', guess);

    const round = rounds[CURRENT_ROUND_INDEX];

    console.log(round);

    // This overwrites previous guesses
    round.guess = guess;
    if (round.answer === guess) {
      correctSound.play();
    } else {
      wrongSound.play();
    }
  };

  p5.draw = () => {
    p5.background(255);
    drawFocusCircle();

    // Play the starting sound
    if (p5.frameCount === 1) {
      roundSound.play();
    }

    const now = Date.now();

    // Game has ended
    if (now >= rounds[rounds.length - 1].endTimestamp) {
      p5.noLoop();

      storeResults(rounds);

      window.location.href = '/end';
    }

    const round = rounds[CURRENT_ROUND_INDEX];

    // Next round
    if (now >= round.endTimestamp) {
      // Update the round
      CURRENT_ROUND_INDEX = CURRENT_ROUND_INDEX + 1;

      targets.moveTargetLocation(CURRENT_ROUND_INDEX);

      roundSound.play();
    } else {
      targets.draw(round.answer);

      targets.update(round.answer);
    }
  };

  function drawFocusCircle() {
    const radius = 20;
    p5.fill(51);
    p5.circle(p5.windowWidth / 2, p5.windowHeight / 2 - radius / 2, radius);
    p5.noFill();
  }
};

export default sketch;
