import { useTextCopy } from '@/react/src'
import { act, renderHook, waitFor } from '@testing-library/react'

describe('useTextCopy', () => {
  let clipboard: string = ''
  beforeAll(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn((text: string) => {
          return new Promise(resolve => {
            clipboard = text
            resolve(text)
          })
        }),
        readText: jest.fn(() => {
          return new Promise(resolve => {
            resolve(clipboard)
          })
        })
      },
      configurable: true
    })
    // jest.useFakeTimers()
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterAll(() => {
    // jest.useRealTimers()
    jest.spyOn(console, 'error').mockRestore()
  })

  it('should copy text to clipboard', async () => {
    const { result } = renderHook(() => useTextCopy())

    const [copy, isCopied] = result.current

    waitFor(async () => await copy('test'))
    waitFor(async () => {
      const clipboard = await navigator.clipboard.readText()
      expect(clipboard).toBe('test')
      expect(isCopied).toBe(true)
    })
  })
  it('should restore isCopied to false when restoreState() is called', async () => {
    const { result } = renderHook(() => useTextCopy())
    const [copy, isCopied, restoreState] = result.current
    waitFor(async () => await copy('test'))
    waitFor(() => {
      expect(isCopied).toBe(true)
    })
    act(() => restoreState())
    waitFor(() => {
      expect(isCopied).toBe(false)
    })
  })

  it('should restore isCopied to false when duration is provided', async () => {
    const { result } = renderHook(() => useTextCopy(1000))
    const [copy, isCopied] = result.current
    waitFor(async () => await copy('test'))
    waitFor(() => {
      expect(isCopied).toBe(true)
    })
    waitFor(() => {
      expect(isCopied).toBe(false)
    })
  })

  it('onError is called when copy is called with an error', async () => {
    const onError = jest.fn()
    const { result } = renderHook(() => useTextCopy(-1, onError))
    const [copy, isCopied] = result.current
    waitFor(async () => await copy('test'))
    waitFor(() => {
      expect(isCopied).toBe(true)
    })
    waitFor(() => {
      expect(onError).toHaveBeenCalled()
    })
  })
})
