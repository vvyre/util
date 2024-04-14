import { Entries } from './types'

/**
 * Alternative of Object.keys() with type assertion
 * @example objectKeys({ a : 1 }) // ['a']
 */
export const objectKeys = <T extends Object>(obj: T) => Object.keys(obj) as Array<keyof T>

/**
 * Alternative of Object.Entries() with type assertion
 * @example objectEntries({ a : 1 }) // [['a', 1]]
 */
export const objectEntries = <T extends Object>(obj: T) => Object.entries(obj) as Entries<T>
