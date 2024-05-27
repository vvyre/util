import { useContext, useMemo } from 'react'
import { ModalContext, Provider } from './provider'

/**
 * A React hook for using modal easily
 * @Link https://github.com/brewcold/util/blob/main/react/src/use-modal/README.md
 * @example
 * //App.jsx
 * export default function App() {
 *  return (
 *      <ModalProvider>
 *        <RouterProvider router={router} />
 *      </ModalProvider>
 *  );
 * }
 *
 * //Form.jsx
 * function Form() {
 * const { open, close } = useModal()
 * const [email, setEmail] = useState('')
 *
 *  const submit = () => {
 *    open(
 *      <Modal
 *        onConfirm={async () => {
 *          const result = await fetch('...')
 *            //...
 *          close()
 *        }}
 *        onCancel={() => close()}
 *      >
 *        does your email {email} correct?
 *      </Modal>
 *    )
 *  }
 *
 *  return (
 *      <form onSubmit={submit}>
 *        <input name="email" value={email} onChange={e => setEmail(e.target.value)} />
 *        <button>SUBMIT</button>
 *      </form>
 *  )
 * }
 */
export const useModal = () => {
  const context = useContext(ModalContext)
  if (context === null)
    throw new Error(`<!> useModal: can't use useModal without ModalProvider above`)

  const { open, close, isOpen } = context

  return useMemo(() => {
    return { open, close, isOpen }
  }, [open, close, isOpen])
}

export const ModalProvider = Provider
