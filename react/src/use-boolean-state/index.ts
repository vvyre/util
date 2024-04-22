import { useState } from 'react'

/**
 * A useState hook for using boolean state conveniently
 * @example const [display, show, hide] = useBooleanState(false)
 * @param initialState
 * If initialState is not provided as an argument, the default state value is set to false.
 * @returns [state, setTrue, setFalse]
 *
 */
export const useBooleanState = (initialState?: boolean) => {
  const init = initialState ?? false

  const [state, set] = useState<boolean>(init)
  const setTrue = () => set(true)
  const setFalse = () => set(false)

  return [state, setTrue, setFalse]
}
