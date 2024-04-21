# useForm (beta)

- supports textarea and inputs (text, number, checkbox)
- During the **beta** period, the API may unexpectedly change or new features may be added

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
        onChange={handleChange}
      />
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <textarea
        name="content">
        value={values.content}
        onChange={handleChange}
      />
      <button>Submit</button>
    </form>
  )
}

```

## Params

### initialValues(\* required)

- `Object` (TS: `T`)
- initial values of inputs
- should be a Object form
- example: `{ email: '', amount: 1234, decaf: true }`

### onSubmit(\* required)

- `Function` (TS: `(values) => any`)
- arg: `values` is passed as the first argument
- recommended to use a function that sends HTTP requests and returns a promise
- **should not include a React hook**
- example: `fetch(...).then(res => res.json())`, `axios.post(...)`

### validator

- `Function` (TS: `(values) => boolean`)
- function that returns a boolean
- arg: `values` is passed as the first argument
- **only operates at the time the submit event occurs**

### refInputNames

- `Array` (TS: `string[]`)
- an Array of input names that will receive a refObject (the result of the useRef hook)

## Returns

### values

- `Object` (TS:`T`)
- `{ inputNames : current values of inputs }`
- example: `{ email: 'abcd@b', amount: 1, decaf: false }`
- When using uncontrolled inputs, their values are not tracked in real-time, unlike controlled inputs where changes are monitored via the onChange event

### handleChange

- `Function` (TS: `(e:ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => void`)
- A function that provides two-way binding between the value and the input component
- It binds whether the component is controlled or uncontrolled

### setValues

- `Function` (TS: `() => void`)
- A function that forcibly changes the values
- Basically it is a `useState` hook, but when integrated with an external library, it invokes `updateStore` fn

### refs

- `Object` (TS:`Record<keyof T, RefObject<HTMLInputElement>> | null`)
- `{ inputName : RefObject }` pair Object
- The ref obtained here can be used to create uncontrolled components or for direct access to the DOM

### refValues

- `Object` (TS: `T`)
- current values of uncontrolled inputs
- Plain javascript object
- example: `{ email: 'abcd@b', amount: 1, decaf: false }`

### submit

- `Function` (TS: `() => void`)
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

### createUseFormContext

- TS: `createUseFormContext<T, K>()`
- [createContext API](https://react.dev/reference/react/createContext#createcontext) that includes type definitions of useForm<T>.
- You can use an optional type parameter, K, to include additional items inside the Context.
- Since the results of the hook must be stored after it is called, **it is not possible to set a default value** in the createContext function.

### useFormContext

- TS: `useFormContext<T, K>()`
- [useContext API](https://react.dev/reference/react/useContext#usecontext) that includes type definitions of useForm.
- You can use an optional type parameter, K, to include additional items inside the Context.
