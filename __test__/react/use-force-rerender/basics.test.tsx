import { useForceRender } from '@/react/src/use-force-render'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useRef } from 'react'

function TestComponent() {
  const count = useRef<number>(0)
  const forceRender = useForceRender()
  const increment = () => {
    count.current++
  }
  const incrementWithRerender = () => {
    count.current++
    forceRender()
  }
  return (
    <>
      <button onClick={() => increment()}>increment</button>
      <button onClick={() => incrementWithRerender()}>incrementWithRerender</button>
      <span>{count.current}</span>
    </>
  )
}

describe('useForceRender', () => {
  it('should force the component re-rendering', () => {
    render(<TestComponent />)

    const No_ReRender_Btn = screen.getByText('increment')
    const ReRender_Btn = screen.getByText('incrementWithRerender')
    const span = screen.getByText('0')
    expect(span).toHaveTextContent('0')

    fireEvent.click(No_ReRender_Btn)
    waitFor(() => expect(span).toHaveTextContent('0'))

    fireEvent.click(ReRender_Btn)
    waitFor(() => expect(span).toHaveTextContent('2'))
  })
})
