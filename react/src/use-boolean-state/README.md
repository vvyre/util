# useBooleanState

- A useState hook for using boolean state conveniently

## Quick Start

```
function Component() {
  const [display, show, hide, toggle] = useBooleanState(false)
  return(
  <>
    <FooComponent display={display} />
    <button
      type="button"
      onClick={ display ? () => hide() : () => show() }
    > Click
    </button>
    <button
      type="button"
      onClick={ () => toggle }
    > Click2
    </button>
  </>
  )
}
```

## Params

### initialState: boolean

`const [display, show, hide] = useBooleanState(initialState)`

- If `initialState` is not provided as an argument, the default state value is set to **false**.

## returns

- returns `[state, setTrue, setFalse]`
- `setTrue()`/`setFalse()`: forcibley set state `true`/`false` (args ignored)
