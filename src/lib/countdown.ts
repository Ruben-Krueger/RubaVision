import P5 from 'p5';

const countdown = (p5: P5) => {
  let timer = 5;

  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerWidth);
  };

  p5.draw = () => {
    p5.background(220);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(100);
    p5.text(timer, p5.width / 2, p5.height / 2);

    if (p5.frameCount % 60 == 0 && timer > 0) {
      timer--;
    }
    if (timer == 0) {
      p5.text('GAME OVER', p5.width / 2, p5.height * 0.7);
    }
  };
};

export default countdown;
