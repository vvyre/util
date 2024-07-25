import { useCallback, useState } from 'react'

/**
 * A React hook for forcibly rendering a component
 *
 * @Link https://github.com/brewcold/util/blob/main/react/src/use-force-render/README.md
 * @example
 *  function Tooltip({ message }) {
 *   const display = useRef(false);
 *   const forceRender = useForceRender();
 *
 *   const toggle = useCallback(() => {
 *     if (display.current) display.current = false;
 *     else display.current = true;
 *     forceRender();
 *   }, []);
 *
 *   return (
 *     <>
 *       <button onClick={() => toggle()}>
 *         btn
 *       </button>
 *       <div className={display.current ? 'show' : 'hide'}>
 *         {message}
 *       </div>
 *     </>
 *   );
 * }
 */

export const useForceRender = () => {
  const [_, setState] = useState(0)
  const forceRender = useCallback(() => setState(prev => prev + 1), [])

  return forceRender
}
