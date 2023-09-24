let boundaryX = 100;
let boundaryY = 100;
let velocity;

function getInitialPosition() {
  return [boundaryX + getRandomInt(-50, 50), boundaryY + getRandomInt(-50, 50)];
}

const positions = [
  getInitialPosition(),
  getInitialPosition(),
  getInitialPosition(),
];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    console.log("left");
  } else if (keyCode === RIGHT_ARROW) {
    console.log("right");
  }
}

function draw() {
  background(255);
  drawBoundary();
  drawFocusCircle();


  drawTargets();
  updateTargets();
}

function updateTargets() {
  for (let i = 0; i < positions.length; i++) {
    positions[i][0] = positions[i][0] + 1;
    positions[i][1] = positions[i][1] + getRandomInt(-1, 1);
  }
}

function drawTarget(x, y) {
  fill(51);
  circle(x, y, 10);
  noFill();
}

function drawTargets() {
  for (let i = 0; i < positions.length; i++) {
    let x = positions[i][0];
    let y = positions[i][1];
    drawTarget(x, y);
  }
}

function drawFocusCircle() {
  const radius = 20;
  fill(51);
  circle(windowWidth / 2, windowHeight / 2 - radius / 2, radius);
  noFill();
}

function drawBoundary() {
  circle(boundaryX, boundaryY, 200);
}
