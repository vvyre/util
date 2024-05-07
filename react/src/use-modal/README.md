# useModal

- A hook for using modal component easily
- **import ModalProvider at the upper level**

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
