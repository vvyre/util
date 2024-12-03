# useIsomorphicLayoutEffect

In an SSR environment, useEffect should be used, while on the client side, useLayoutEffect should be utilized. This helps prevent hydration errors in ssr framework such as Next.js. [e.g. https://react.dev/errors/418](https://react.dev/errors/418)

## Quick Start

```
  useIsomorphicLayoutEffect(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storedTheme = localStorage.getItem('BLOG_THEME');
      const devicePrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      setPrefersDark(devicePrefersDark);

      if (storedTheme) setTheme(storedTheme);
      else if (devicePrefersDark) setDark();
    }
  }, []);
```
