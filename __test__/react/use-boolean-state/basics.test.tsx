import { renderHook, act, waitFor } from '@testing-library/react'
import { useBooleanState } from '@/react/src'

describe('Hook Initialization', () => {
  it('should correctly set initial values ', () => {
    const { result: def } = renderHook(() => useBooleanState())
    expect(def.current[0]).toEqual(false)

    const { result } = renderHook(() => useBooleanState(true))
    expect(result.current[0]).toEqual(true)
  })

  it('should correctly set values with setTrue/setFalse fn', () => {
    const { result } = renderHook(() => useBooleanState(true))
    const [_, setTrue, setFalse] = result.current
    act(() => typeof setFalse === 'function' && setFalse())
    expect(result.current[0]).toEqual(false)
    act(() => typeof setTrue === 'function' && setTrue())
    expect(result.current[0]).toEqual(true)
  })

  it('should correctly set values with toggle fn', () => {
    const { result } = renderHook(() => useBooleanState(true))
    const [_, __, ___, toggle] = result.current
    act(() => toggle())
    waitFor(() => expect(result.current[0]).toEqual(false))
    act(() => toggle())
    waitFor(() => expect(result.current[0]).toEqual(true))
  })
})
