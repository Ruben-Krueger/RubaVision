import init from '../lib/canvas';
import React, { useEffect } from 'react';

export default function Canvas(): JSX.Element {
  init();

  useEffect(() => () => {
    document.getElementById('sketch')?.remove();
  });

  return <></>;
}
