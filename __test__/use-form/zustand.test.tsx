import React from 'react'
import { render, renderHook, screen, act, fireEvent, waitFor } from '@testing-library/react'
import { useForm } from '../../use-form/src'
import { User, useUserStore } from './__mocks__/store'

describe('Hook Initialization', () => {
  it('should correctly set initial values ', () => {
    const initialValues: User = {
      email: 'abcd@abcd.com',
      password: 'abcd'
    }
    const onSubmit = jest.fn()

    const { result } = renderHook(() => useUserStore())
    const { updateStore } = result.current

    renderHook(() =>
      useForm({
        initialValues,
        onSubmit,
        updateStore
      })
    )

    expect(result.current.values).toEqual(initialValues)
  })

  it('should correctly update values with setValues', async () => {
    const initialValues: User = {
      email: 'abcd@abcd.com',
      password: 'abcd'
    }
    const onSubmit = jest.fn()
    const { result } = renderHook(() => useUserStore())
    const { updateStore } = result.current

    renderHook(() =>
      useForm({
        initialValues,
        onSubmit,
        updateStore
      })
    )
    expect(result.current.values).toEqual(initialValues)

    act(() => result.current.setValues({ email: 'zxcv@zxcv.com', password: 'b' }))

    await waitFor(() => {
      expect(result.current.values).toEqual({ email: 'zxcv@zxcv.com', password: 'b' })
    })
  })
})

describe('Component Bindings', () => {
  it('should correctly track changes to input values', () => {
    const initialValues = {
      email: 'abcd@email.com',
      password: '12345'
    }
    const onSubmit = jest.fn()

    const { result } = renderHook(() => useUserStore())
    const { updateStore } = result.current

    renderHook(() =>
      useForm<typeof initialValues>({
        initialValues,
        onSubmit,
        updateStore
      })
    )

    render(
      <form onSubmit={result.current.submit}>
        <input
          placeholder="email"
          type="text"
          name="email"
          value={result.current.values.email}
          onChange={result.current.handleChange}
        />
        <input
          placeholder="password"
          type="text"
          name="password"
          value={result.current.values.password}
          onChange={result.current.handleChange}
        />
        <button type="submit">Login</button>
      </form>
    )

    const emailInput = screen.getByPlaceholderText('email')
    const passwordInput = screen.getByPlaceholderText('password')

    expect(result.current.values.email).toBe('abcd@email.com')
    expect(result.current.values.password).toBe('12345')

    fireEvent.change(emailInput, { target: { value: 'hello@hello.com' } })
    expect(result.current.values.email).toBe('hello@hello.com')

    fireEvent.change(passwordInput, { target: { value: '98765' } })
    expect(result.current.values.password).toBe('98765')
  })

  it('should correctly track values of uncontrolled inputs', () => {
    const initialValues = {
      email: 'latte@coffee.com',
      password: 'decaf'
    }
    const refInputNames: (keyof typeof initialValues)[] = ['password']
    const onSubmit = jest.fn()

    const { result } = renderHook(() => useUserStore())
    const { updateStore } = result.current

    renderHook(() =>
      useForm<typeof initialValues>({
        initialValues,
        onSubmit,
        refInputNames,
        updateStore
      })
    )

    render(
      <form onSubmit={result.current.submit}>
        <input
          placeholder="email"
          type="text"
          name="email"
          value={result.current.values.email}
          onChange={result.current.handleChange}
        />
        <input
          placeholder="password"
          type="text"
          name="password"
          ref={result.current.refs?.password}
          value={result.current.refs?.password.current?.value}
          onChange={result.current.handleChange}
        />
        <button type="submit">Login</button>
      </form>
    )

    const refInput = screen.getByPlaceholderText('password')
    expect(result.current.values.password).toBe('decaf')

    fireEvent.change(refInput, { target: { value: 'brewcoldblue' } })

    expect(result.current.values.password).toBe('brewcoldblue')
  })
})

describe('Form Submission', () => {
  it('should handle form submission, validation, loading state, and server response correctly', async () => {
    const initialValues = {
      email: 'abcd',
      password: 'asdqwe'
    }

    // disable http mocking b/c of error
    // nock('http://useformtest.com')
    //   .post('/login', { email: 'abcd@email.com', password: 'asdqwe123' })
    //   .reply(200, { message: 'success!' })

    // const onSubmit = (body: typeof initialValues) =>
    //   axios.post('http://useformtest.com/login', body, {
    //     adapter: 'http'
    //   })

    const onSubmit = jest.fn().mockResolvedValue({ message: 'success!' })

    const validator = (data: typeof initialValues) => {
      const isValidMail = (str: string) => {
        if (str.includes('@')) return true
        else return false
      }
      const isValidPw = (str: string) => {
        if (str.length > 8) return true
        else return false
      }
      if (isValidMail(data.email) && isValidPw(data.password)) return true
      else return false
    }

    const { result } = renderHook(() => useUserStore())
    const { updateStore } = result.current

    renderHook(() =>
      useForm<typeof initialValues>({
        initialValues,
        onSubmit,
        validator,
        updateStore
      })
    )

    render(
      <form data-testid="testform" onSubmit={result.current.submit}>
        <input
          placeholder="email"
          type="text"
          name="email"
          value={result.current.values.email}
          onChange={result.current.handleChange}
        />
        <input
          placeholder="password"
          type="text"
          name="password"
          value={result.current.values.password}
          onChange={result.current.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    )

    const emailInput = screen.getByPlaceholderText('email')
    const passwordInput = screen.getByPlaceholderText('password')

    const testform = screen.getByTestId('testform')

    fireEvent.change(emailInput, { target: { value: 'abcd@email.com' } })
    fireEvent.change(passwordInput, { target: { value: 'asdqwe123' } })
    fireEvent.submit(testform)

    console.log(result.current)
    await waitFor(() => {
      expect(result.current.valid).toBe(true)
      expect(onSubmit).toHaveBeenCalled()
      expect(result.current.isLoading).toBe(false)
      expect(result.current.response).not.toBe(null)
    })

    // nock.cleanAll()
  })
})
