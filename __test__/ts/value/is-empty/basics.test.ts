import { isEmpty } from '@/ts/src/is-empty'

describe('is-empty', () => {
  test(`if values are null or undefined or ('')`, () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty('')).toBe(true)
  })
  test('if values are other primitive falsy values', () => {
    expect(isEmpty(0)).toBe(false)
    expect(isEmpty(false)).toBe(false)
  })
  test('if values are array or object and elements are EMPTY', () => {
    expect(isEmpty([])).toBe(true)
    expect(isEmpty([undefined])).toBe(true)
    expect(isEmpty(['undefined'])).toBe(false)
    expect(isEmpty([null])).toBe(true)
    expect(isEmpty([{}])).toBe(true)
    expect(isEmpty([[]])).toBe(true)
    expect(isEmpty([{ a: [], b: null }, [{}, undefined]])).toBe(true)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty({ a: {}, b: '' })).toBe(true)
    expect(isEmpty({ a: 0 })).toBe(false)
  })
})
