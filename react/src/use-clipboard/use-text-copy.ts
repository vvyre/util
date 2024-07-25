import { useEffect } from 'react'
import { useBooleanState } from '../use-boolean-state'

/**
 * - A React hook for copying plain text to clipboard
 * @param duration
 * (ms) If not provided, it defaults to 0.
 * If provided, the isCopied state will change from true to false after the specified time following the text being copied.
 * @returns [ copy, isCopied, restoreState ]
 * @Link https://github.com/brewcold/util/blob/main/react/src/use-clipboard/README.md
 *
 */
export const useTextCopy = (
  duration?: number,
  onError?: () => void
): [(text: string) => Promise<void>, Boolean, () => void] => {
  const [isCopied, setCopied, restoreState] = useBooleanState(false)

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
        restoreState()
      }, duration)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [isCopied, duration])

  return [copy, isCopied, restoreState]
}
