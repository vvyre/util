# useConditionalRender

- React Hook for triggering a component (un)mount
- useful in conditional transition animtaion with (un)mounting component

## Quick Start

```
// Component.jsx

function Component() {
  const [value, setValue] = useState('')
  const [shouldRender, unmount, isMounted] = useConditionalRender((value.length > 9))

  return (
    <div>
      {shouldRender && <div>Checked!</div>}
      <input type="text" value={value} />
      <button onClick={() => unmount()}>Unmount</button>
    </div>
  )
}
```
