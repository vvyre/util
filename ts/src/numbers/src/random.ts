export const getRandomInt = (num: number) => Math.floor(Math.random() * num)

/**
 *
 * @param range [number, number]
 * @param type 'number' | 'int', default: 'number'
 * @returns number N that low <= N < high
 */
export const getRandomNumber = (
  range: [number, number],
  type: 'int' | 'number' = 'number'
): number => {
  const [low, high] = range[0] < range[1] ? [range[0], range[1]] : [range[1], range[0]]

  return type === 'int'
    ? getRandomInt(high - low + 1) + low
    : Math.random() * (high - low + 1) + low
}
