# useModal

- A hook for using random number easily

## Quick Start

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

## useModal

- example: `const num = useRandomNumber([0, 10], 'int')`

## returns

- `num`: random number (React State)
