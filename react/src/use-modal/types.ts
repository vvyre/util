import { ReactNode } from 'react'

export type defineModal = (props: ModalProps) => ReactNode

export interface ModalProps {
  open: (modal: ReactNode) => void | defineModal
  close: () => void
  isOpen: boolean
}
