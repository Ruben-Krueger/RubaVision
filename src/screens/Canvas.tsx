import React, { useEffect } from 'react';
import sketch from '../lib/sketch';
import countdown from '../lib/countdown';
import p5 from 'p5';

export default function Canvas(): JSX.Element {
  useEffect(() => {
    new p5(sketch, document.getElementById('sketch') ?? undefined);

    return () => {
      document.getElementById('sketch')?.remove();
    };
  }, []);

  return <div id="sketch"></div>;
}
