import init from './lib/canvas';
import React, { useEffect } from 'react';

export default function Canvas() {
  init();

  useEffect(() => () => {
    document.getElementById('sketch')?.remove();
  });

  return <></>;
}
