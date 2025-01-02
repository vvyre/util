/* eslint-disable react-hooks/rules-of-hooks */
import { getRandomNumber } from '@/ts/src'
import { DependencyList, useEffect, useState } from 'react'

/**
 * React hook for using random number with range easily
 * @param range [number, number]
 * @param deps useEffect Deps list
 * @param type 'number'|'int', default: 'number'
 * @param initialState 'initial state'
 * @returns number N that low <= N < high (react state)
 */
export const useRandomNumber = (
  range: [number, number],
  deps: DependencyList,
  type: 'int' | 'number' = 'number',
  initialState?: number
): number => {
  const [low, high] = range[0] < range[1] ? [range[0], range[1]] : [range[1], range[0]]
  const [N, setNum] = useState<number>(() => initialState ?? low)

  const n = getRandomNumber(range, type)
  useEffect(() => {
    setNum(n)
  }, [low, high, ...deps])

  return N
}
