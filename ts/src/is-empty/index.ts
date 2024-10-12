import { objectKeys } from '../object'

/**
 * returns whether param is 'EMPTY' or not.
 *
 * EMPTY values are:
 * `'', [], {}, null, undefined, EMPTY[], EMPTY{}`
 * @example isEmpty({a: ''}) //true
 * isEmpty(['', {}, null])) //true
 */
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true

  if (typeof value === 'string') return value === ''

  if (Array.isArray(value)) return value.length === 0 || value.every(i => isEmpty(i))

  if (typeof value === 'object') {
    const keys = objectKeys(value)
    if (keys.length === 0) return true
    return keys.every(keys => isEmpty(value[keys]))
  }

  return false
}
