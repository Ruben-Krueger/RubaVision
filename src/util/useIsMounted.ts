import { useRef } from 'react';

// export function useIsMounted(): boolean {
//   const isMounted = useRef(false);

//   useEffect(() => {
//     isMounted.current = true;

//     return () => {
//       isMounted.current = false;
//     };
//   }, []);

//   return (isMounted.current;
// }

export default function useIsFirstRender(): boolean {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
}
