# useTextCopy

- A React hook for copying plain text to clipboard
- other types will be provided later
- example: `const [ copy, isCopied, restoreState ] = useTextCopy(duration, onError)`
- **works only in localhost or https**

## Quick Start

```
export function Component() {
  const path = usePathname()
  const url = 'http://loclhost:3000' + path
  const [ copy, isCopied ] = useTextCopy(1000)

  return (
    <>
      <h1>{isCopied ? 'COPIED' : 'PLEASE COPY'}</h1>
      <button onClick={() => copy(url)}>COPY!</button>
    </>
  )
}


```

## Params

- example: `const [ copy, isCopied, restoreState ] = useTextCopy(duration, onError)`
- `duration`: number > 0, if this parameter is provided, the `isCopied` state will be restored in the specified number of milliseconds.
- `onError`: function that executes when a clipboard error occurs.

## Returns

- `copy()`: copies the text to the clipboard.
- `isCopied`: boolean indicating if the copy was successful.
- `restoreState`: restores `isCopied` to false.
