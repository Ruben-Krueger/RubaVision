import P5 from 'p5';

const sketch = (p: P5) => {
  const boundaryX = 100;
  const boundaryY = 100;

  function getInitialPosition() {
    return [
      boundaryX + getRandomInt(-50, 50),
      boundaryY + getRandomInt(-50, 50),
    ];
  }

  const positions = [
    getInitialPosition(),
    getInitialPosition(),
    getInitialPosition(),
  ];

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
  };

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  p.keyPressed = () => {
    if (p.keyCode === p.LEFT_ARROW) {
      console.log('left', Math.random());
    } else if (p.keyCode === p.RIGHT_ARROW) {
      console.log('right');
    }
  };

  p.draw = () => {
    p.background(255);
    drawBoundary();
    drawFocusCircle();

    drawTargets();
    updateTargets();
  };

  function updateTargets() {
    for (let i = 0; i < positions.length; i++) {
      positions[i][0] = positions[i][0] + 1;
      positions[i][1] = positions[i][1] + getRandomInt(-1, 1);
    }
  }

  function drawTarget(x: number, y: number) {
    p.fill(51);
    p.circle(x, y, 10);
    p.noFill();
  }

  function drawTargets() {
    for (let i = 0; i < positions.length; i++) {
      const x = positions[i][0];
      const y = positions[i][1];
      drawTarget(x, y);
    }
  }

  function drawFocusCircle() {
    const radius = 20;
    p.fill(51);
    p.circle(p.windowWidth / 2, p.windowHeight / 2 - radius / 2, radius);
    p.noFill();
  }

  function drawBoundary() {
    p.circle(boundaryX, boundaryY, 200);
  }
};

export default sketch;
