import { useState } from 'react'

/**
 * A useState hook for using boolean state conveniently
 * @example const [display, show, hide, toggle] = useBooleanState(false)
 * @param initialState
 * If initialState is not provided as an argument, the default state value is set to false.
 * @returns [state, setTrue, setFalse, toggle]
 * @Link https://github.com/brewcold/util/blob/main/react/src/use-boolean-state/README.md
 *
 */
export const useBooleanState = (
  initialState?: boolean
): [boolean, () => void, () => void, () => void] => {
  const init = initialState ?? false

  const [state, set] = useState<boolean>(init)
  const setTrue = () => set(true)
  const setFalse = () => set(false)
  const toggle = () => set(!state)

  return [state, setTrue, setFalse, toggle]
}
