# Numbers

- Hooks for using random number easily

## useRandomNumber

### Quick Start

```
//Congrats.jsx
export function Congrats({data}) {

 //returns random int between 0 <= X < 10
 const num = useRandomNumber([0, 10], 'int')

 return (
  <div>{num < 5 ? "congrats!" : "It's a waste!"}</div>
 )
}
```

### example and returns

- `const num = useRandomNumber([0, 10], 'int')`
- returns `num`: random number (React State)

---

## useRandomNumberEffect

### Quick Start

```
//Congrats.jsx
export function Congrats() {

 const [res, setRes] = useState({...})
 const draw = () => fetch(...).then(...)

 //returns random int between 0 <= X < 10
 const num = useRandomNumber([0, 10], 'int', [res.result], -1)

 return (
  <div>
    <h1>LUCKY DRAW!!!</h1>
    <button onClick={() => draw()}> Good Luck! </button>
    <div>{ num < 5 ? "congrats!" : "It's a waste!" }</div>
  <div>
 )
}
```

### example and returns

- `const num = useRandomNumber([0, 10], 'int', [deps], initialState)`
- returns `[state, setState]` (same as React.useState)
