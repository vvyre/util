export const isServer = () =>
  typeof window === 'undefined' ||
  (typeof global !== 'undefined' && Object.prototype.toString.call(global) === '[object global]')
export const isClient = () => !isServer()
