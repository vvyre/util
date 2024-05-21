import { useEffect } from 'react'
import { useBooleanState } from '../use-boolean-state'

export const useTextCopy = (type: 'text', duration?: number, onError?: () => void) => {
  const [isCopied, setCopied, restore] = useBooleanState(false)

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      const copiedText = await navigator.clipboard.readText()
      if (copiedText === text) {
        setCopied()
      } else {
        console.error('<!> useTextCopy', 'Text not copied')
      }
    } catch (err) {
      console.error('<!> useTextCopy', err)
      onError && onError()
    }
  }

  useEffect(() => {
    if (!isCopied) return

    let timer: ReturnType<typeof setTimeout> | undefined
    if (duration && duration > 0) {
      timer = setTimeout(() => {
        restore()
      }, duration)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [isCopied, duration])

  return { copy, isCopied, restoreState: restore }
}
