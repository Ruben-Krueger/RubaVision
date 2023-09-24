function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.mouseClicked(() => (window.location.href = 'main.html'));
}

function drawStartButton() {
  const buttonWidth = 300;
  const buttonHeight = 100;
  const textsize = 32;

  textSize(textsize);
  rect(
    windowWidth / 2 - buttonWidth / 2,
    windowHeight / 2 - buttonHeight / 2,
    buttonWidth,
    buttonHeight,
  );
  text('START', windowWidth / 2 - textsize, windowHeight / 2);
}

function draw() {
  drawStartButton();
}
