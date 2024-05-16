import { useDebouncedEffect } from '@/react/src/use-debounced'
import { renderHook } from '@testing-library/react'

describe('useDebouncedEffect', () => {
  jest.useFakeTimers()

  it('should call the function after the specified delay', () => {
    const mockFn = jest.fn()
    renderHook(() => useDebouncedEffect(mockFn, 1000))
    expect(mockFn).not.toHaveBeenCalled()

    jest.runAllTimers()
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
