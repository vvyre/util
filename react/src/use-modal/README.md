# useModal

- A hook for using modal component easily
- **should be used within ModalProvider**

## Quick Start

```
//App.jsx
export default function App() {
 return (
 <>
   <QueryClientProvider client={queryClient}>
     ...
       <ModalProvider>
         <RouterProvider router={router} />
       </ModalProvider>
     ...
   </QueryClientProvider>
 </>
 );
}

//Form.jsx
function Form() {
const { open, close } = useModal()
const [email, setEmail] = useState('')

 const submit = () => {
   open(
     <Modal
       onConfirm={async () => {
         const result = await fetch('...')
           //...
         close()
       }}
       onCancel={() => close()}
     >
       does your email {email} correct?
     </Modal>
   )
 }

 return (
     <form onSubmit={submit}>
       <input name="email" value={email} onChange={e => setEmail(e.target.value)} />
       <button>SUBMIT</button>
     </form>
 )
}

```

## ModalProvider

- Context Provider for useModal hook
- useModal hook should be used within ModalProvider

## useModal

- example: `const {open, close, isOpen} = useModal()`
- **When a modal is mounted while another modal is already mounted, the previous modal is unmounted** (Plan to update for managing multiple modals in the future)

## returns

- `open(modal)`: open modal element (ReactElement e.g. `<Component />`)
- `close()`: close opened modal
- `isOpen`: boolean
