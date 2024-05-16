import { useEffect, useState } from 'react'

export const state = <T>(
  initialValue: T,
  delay: number
): [T, React.Dispatch<React.SetStateAction<T>>, T] => {
  const [value, setValue] = useState<T>(initialValue)
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return [debouncedValue, setValue, value]
}
