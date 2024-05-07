import '@testing-library/jest-dom'
import { ModalProvider, useModal } from '@/react/src'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ReactElement } from 'react'

function TestModal() {
  return <div>TestModal</div>
}

function AnotherModal() {
  return <div>AnotherModal</div>
}

function PageComponent() {
  const { open, close, isOpen } = useModal()

  return (
    <div>
      <span>{String(isOpen)}</span>
      <button onClick={() => open(<TestModal />)}>open</button>
      <button onClick={() => close()}>close</button>
      <button onClick={() => open(<AnotherModal />)}>another</button>
    </div>
  )
}

function renderWithModalProvider(children: ReactElement) {
  return render(<ModalProvider>{children}</ModalProvider>)
}

describe('useModal', () => {
  it('should mount/unmound component when open() and close() function is called', async () => {
    const TESTER = userEvent.setup()
    renderWithModalProvider(<PageComponent />)

    const openBtn = screen.getByText('open')
    const closeBtn = screen.getByText('close')

    await TESTER.click(openBtn)
    expect(screen.getByText('TestModal')).toBeInTheDocument()
    expect(screen.getByText('true')).toBeInTheDocument()

    await TESTER.click(closeBtn)
    expect(screen.queryByText('TestModal')).not.toBeInTheDocument()
    expect(screen.getByText('false')).toBeInTheDocument()
  })

  it('should unmount existing modal component when the open() function is called again', async () => {
    const TESTER = userEvent.setup()
    renderWithModalProvider(<PageComponent />)

    const openBtn = screen.getByText('open')
    const anotherBtn = screen.getByText('another')
    const closeBtn = screen.getByText('close')

    await TESTER.click(openBtn)
    expect(screen.getByText('TestModal')).toBeInTheDocument()
    expect(screen.getByText('true')).toBeInTheDocument()

    await TESTER.click(anotherBtn)
    expect(screen.queryByText('TestModal')).not.toBeInTheDocument()
    expect(screen.getByText('AnotherModal')).toBeInTheDocument()
    expect(screen.getByText('true')).toBeInTheDocument()

    await TESTER.click(closeBtn)
    expect(screen.queryByText('TestModal')).not.toBeInTheDocument()
    expect(screen.queryByText('AnotherModal')).not.toBeInTheDocument()
    expect(screen.getByText('false')).toBeInTheDocument()
  })
})
