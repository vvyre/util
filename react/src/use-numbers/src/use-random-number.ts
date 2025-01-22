import { getRandomNumber } from '@/ts/src'
import { useState } from 'react'

/**
 * React hook for using random number with range easily
 * @param range [number, number]
 * @param type 'number'|'int', default: 'number'
 * @returns number N that low <= N < high (react state)
 */
export const useRandomNumber = (
  range: [number, number],
  type: 'int' | 'number' = 'number'
): number => {
  const [low, high] = range[0] < range[1] ? [range[0], range[1]] : [range[1], range[0]]

  const [N] = useState<number>(() =>
    typeof window === 'undefined' ? low : getRandomNumber([low, high], type)
  )

  return N
}
