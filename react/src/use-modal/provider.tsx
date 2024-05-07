import { PropsWithChildren, createContext, useState } from 'react'
import type { ReactNode } from 'react'
import { ModalProps, defineModal } from './types'
import { useBooleanState } from '../use-boolean-state'

export const ModalContext = createContext<ModalProps>({
  open: () => {},
  close: () => {},
  isOpen: false
})

export function Provider({ children }: PropsWithChildren) {
  const [modal, setModal] = useState<defineModal | ReactNode>(null)
  const [isOpen, setOpen, setClose] = useBooleanState(false)
  const open = (modal: defineModal | ReactNode) => {
    if (typeof modal === 'undefined' || modal === null)
      throw new Error('<!> useModal: Modal Component Should Be Provided')
    else {
      setModal(modal)
      setOpen()
    }
  }
  const close = () => {
    setModal(null)
    setClose()
  }

  const context = { open, close, isOpen }

  return (
    <ModalContext.Provider value={context}>
      {children}
      <>{modal}</>
    </ModalContext.Provider>
  )
}
