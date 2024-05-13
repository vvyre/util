import { useEffect } from 'react'
import { useBooleanState } from '..'

/**
 * React Hook for triggering (un)mount component
 * useful in conditional transition animtaion with component (un)mounting
 *
 * @param condition - The condition(boolean) to set the component
 * @returns [shouldRender, unmount, isMounted]
 */
export const useConditionalRender = (
  condition: boolean | (() => boolean)
): [boolean, () => void, boolean] => {
  const [isComplete, setComplete, reset] = useBooleanState(false)

  const CONDITION = typeof condition === 'function' ? condition() : condition

  useEffect(() => {
    if (CONDITION) {
      setComplete()
    }
  }, [CONDITION])

  const shouldRender = CONDITION || isComplete //true when component should be rendered
  const isMounted = CONDITION && isComplete //true when component is mounted

  const unmount = () => reset()

  return [shouldRender, unmount, isMounted]
}
