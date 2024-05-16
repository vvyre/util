# @syyu/util

Javascript/Typescript Utility Package for Practice

## REACT

`import {...} from '@syyu/util/react'`

### `useConditionalRender`

- A React hook for using conditional render easily
- useful in triggering animation with (un)mounting component
- [DOCS](https://github.com/brewcold/util/blob/main/react/src/use-conditional-render/README.md)

### `useModal`

- A React hook for using Modal easily
- [DOCS](https://github.com/brewcold/util/blob/main/react/src/use-modal/README.md)

### `useBooleanState`

- A useState hook for using boolean state conveniently
- example `const [display, show, hide, toggle] = useBooleanState(initialState)`
- If `initialState` is not provided as an argument, the default state value is set to **false**.
- [DOCS](https://github.com/brewcold/util/blob/main/react/src/use-boolean-state/README.md)

### `useDebouncedEffect/useDebouncedState`

- A React hook for debounced effect/state
- [DOCS](https://github.com/brewcold/util/blob/main/react/src/use-debounced/README.md)

### `useForm (beta)`

- A React hook for using form easily
- During the **beta** period, the API may unexpectedly change or new features may be added
- supports textarea and inputs (text, number, checkbox)
- provides APIs, `createUseFormContext` and `useFormContext` for integrating with Context API
- [DOCS](https://github.com/brewcold/util/blob/main/react/src/use-form/README.md)

## JS/TS

`import {...} from '@syyu/util'`

### `objectKeys`

alternative of `Object.keys()` with type assertion

### `objectEntries`

alternative of `Object.Entries()` with type assertion
