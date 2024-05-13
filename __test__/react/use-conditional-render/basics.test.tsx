import { useConditionalRender } from '@/react/src/use-conditional-render'
import { renderHook } from '@testing-library/react'

describe('useConditionalRender', () => {
  it('should return falses when initial condition is false', () => {
    const { result } = renderHook(() => useConditionalRender(false))
    const [shouldRender, _, isMounted] = result.current
    expect(shouldRender).toBe(false)
    expect(isMounted).toBe(false)
  })

  it('should return trues when initial condition is true', () => {
    const { result } = renderHook(() => useConditionalRender(true))
    const [shouldRender, _, isMounted] = result.current
    expect(shouldRender).toBe(true)
    expect(isMounted).toBe(true)
  })

  it('should return falses when condition changes from true to false', () => {
    const { result, rerender } = renderHook(({ condition }) => useConditionalRender(condition), {
      initialProps: { condition: true }
    })
    const [_, unmount] = result.current

    unmount()
    rerender({ condition: false })

    const [shouldRender, __, isMounted] = result.current

    expect(shouldRender).toBe(false)
    expect(isMounted).toBe(false)
  })

  it('should update isComplete when condition changes from false to true', () => {
    const { result, rerender } = renderHook(({ condition }) => useConditionalRender(condition), {
      initialProps: { condition: false }
    })
    rerender({ condition: true })

    const [shouldRender, _, isMounted] = result.current

    expect(shouldRender).toBe(true)
    expect(isMounted).toBe(true)
  })
})
