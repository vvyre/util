import { getRandomNumber, isClient, isServer } from '@/ts/src'
import { DependencyList, Dispatch, SetStateAction, useEffect, useState } from 'react'

/**
 * React hook for using random number with range easily
 * @param range [number, number]
 * @param type 'number'|'int', default: 'number'
 * @param deps effect hook deps list
 * @param initialState initial state for state
 * @returns number N that low <= N < high (react state)
 */
export const useRandomNumber = (
  range: [number, number],
  type: 'int' | 'number' = 'number',
  deps: DependencyList = [],
  initialState: number = getRandomNumber(range, type)
): [number, Dispatch<SetStateAction<number>>] => {
  const [low, high] = range[0] < range[1] ? [range[0], range[1]] : [range[1], range[0]]

  const [N, setNumber] = useState<number>(() => (isServer() ? low : initialState))

  useEffect(() => {
    if (isClient()) {
      const update = getRandomNumber([low, high], type)
      setNumber(update)
    }
  }, [type, range, ...deps])

  return [N, setNumber]
}
