import P5 from './lib/canvas';
import React, { useEffect } from 'react';

export default function Canvas() {
  P5();

  useEffect(() => () => {
    document.getElementById('sketch').remove();
  });

  return <></>;
}
