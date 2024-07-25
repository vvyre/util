# useForceRender

- Force a component to re-render using the useState hook.
- It can be useful for creating components that are not affected by rendering or when you need to control the rendering timing arbitrarily.

## Quick Start

`const forceRender = useForceRender()`

```
 function Tooltip({ message }) {
  const display = useRef(false);
  const forceRender = useForceRender();

  const toggle = useCallback(() => {
    if (display.current) display.current = false;
    else display.current = true;
    forceRender();
  }, []);

  return (
    <>
      <button onClick={() => toggle()}>
        btn
      </button>
      <div className={display.current ? 'show' : 'hide'}>
        {message}
      </div>
    </>
  );
 }

```
