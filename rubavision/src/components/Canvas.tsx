import init from '../lib/canvas';
import React, { useEffect } from 'react';
import useIsMounted from '../util/useIsMounted';

export default function Canvas(): JSX.Element {
  const isMounted = useIsMounted();
  console.log(isMounted);
  useEffect(() => {
    init();
    // console.log('init', isMounted);

    return () => {
      document.getElementById('sketch')?.remove();
    };
  }, []);

  return <></>;
}
