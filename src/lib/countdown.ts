import P5 from 'p5';

const countdown = (p5: P5) => {
	let timer = 3;

	p5.setup = () => {
		p5.createCanvas(window.innerWidth, window.innerWidth);
	};

	p5.draw = () => {
		p5.background(255);
		p5.textSize(100);
		p5.text(timer, p5.width / 2, window.innerHeight / 2);

		if (p5.frameCount % 60 === 0 && timer > 0) {
			timer--;
		}
	};
};

export default countdown;
