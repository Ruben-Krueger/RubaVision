import p5 from 'p5';
import sketch from './sketch';

const init = () =>
  new p5(sketch, document.getElementById('sketch') ?? undefined);

console.log(document.getElementById('sketch'));

export default init;
