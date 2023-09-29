import p5 from 'p5';
import sketch from './sketch.js';

const init = () => new p5(sketch, document.getElementById('sketch'));

export default init;
