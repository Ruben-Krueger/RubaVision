import React, { useEffect } from 'react';
import sketch from '../lib/sketch';
import countdown from '../lib/countdown';
import p5 from 'p5';
import { useTimeout } from '@mantine/hooks';

export default function Canvas(): JSX.Element {
  const { start, clear } = useTimeout(() => {
    document.getElementById('sketch')?.remove();
    new p5(sketch, document.getElementById('sketch') ?? undefined);
  }, 3000);

  useEffect(() => {
    start();
    new p5(countdown, document.getElementById('sketch') ?? undefined);

    return () => {
      document.getElementById('sketch')?.remove();
      clear();
    };
  }, []);

  return <div id="sketch"></div>;
}
