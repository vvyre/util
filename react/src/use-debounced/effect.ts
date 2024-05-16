import { useCallback, useEffect } from 'react'

export const effect = (fn: Function | (() => Function), delay: number) => {
  const memiosedFn = useCallback(() => fn(), [fn, delay])

  useEffect(() => {
    const timer = setTimeout(() => {
      memiosedFn()
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [memiosedFn])
}
