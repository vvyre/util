# useForm (beta)

- supports textarea and inputs (text, number, checkbox)

## Quick Start

```
const initialValues = {
  name: '',
  email: '', //match key with input's name attribute
  content: '',
}
const onSubmit = () => fetch(...) //should not be a React hook

//Form.jsx
function Form() {
  const { values, handleChange, submit } = useForm({ initialValues, onSubmit })

  return (
    <form onSubmit={submit}>
      <input
        name="name"
        value={values.name}
        handleChange={handleChange}
      />
      <input
        name="email"
        value={values.email}
        handleChange={handleChange}
      />
      <textarea
        name="content">
        value={values.content}
        handleChange={handleChange}
      />
      <button>Submit</button>
    </form>
  )
}

```

## Params

### initialValues(\* required)

- initial values of inputs
- should be a Object form
- example: `{ email: '', amount: 1234, decaf: true }`

### onSubmit(\* required)

- recommended to use a function that sends HTTP requests and returns a promise
- should not include a React hook
- example: `fetch(...).then(res => res.json())`, `axios.post(...)`

### validator

- function that returns a boolean
- entire current form data is passed as the first argument
- only operates at the time the submit event occurs

### refInputNames

- an array of input names that will receive a refObject (the result of the useRef hook)

### updateStore

- a setter function to store the entire return value of the useForm data (when integrating an external state managing library e.g. redux, zustand, recoil)

## Returns

### values

- Values of inputs
- Plain javascript object
- example: `{ email: 'abcd@b', amount: 1, decaf: false }`
- When using uncontrolled inputs, those values are not tracked in real time

### handleChange

- A function that provides two-way binding between the value and the input component
- It binds whether the component is controlled or uncontrolled

### setValues

- A function that forcibly changes the values
- Basically it is a `useState` hook, but when integrated with an external library, it invokes `updateStore` fn.

### refs

- `inputName : RefObject` pair Object
- The ref obtained here can be used to create uncontrolled components or for direct access to the DOM

### submit

- A function that practically triggers the submit event.
- It controls the internal state.

### isLoading

- boolean
- Whether the response from the onSubmit function passed as an argument is loading.

### response

- response for onSubmit

## with TypeScript

example
`const {...} = useForm<T>({...})`

- An `interface UseForm<T>` is provided to easily define the return type.

## with External Store

### createUseFormContext<T, K>()

- createContext API that includes type definitions of useForm<T>.
- You can use an optional type parameter, K, to include additional items inside the Context.
- Since the results of the hook must be stored after it is called, it is not possible to set a default value in the createContext function.

### useFormContext<T, K>(CTX)

- useContext API that includes type definitions of useForm.
