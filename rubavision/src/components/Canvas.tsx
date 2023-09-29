import init from '../lib/canvas';
import React, { useEffect } from 'react';

export default function Canvas(): JSX.Element {
  useEffect(() => {
    init();

    return () => {
      document.getElementById('sketch')?.remove();
    };
  }, []);

  return <></>;
}
