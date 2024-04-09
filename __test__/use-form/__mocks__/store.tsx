import { create } from './zustand'
import { StateCreator } from 'zustand'
import { UseForm } from '../../../use-form/src/types'

export interface User {
  email: string
  password: string
}

export interface UseFormSlice extends UseForm<User> {
  updateStore: (data: Partial<UseForm<User>>) => void
}

const user = {
  email: '',
  password: ''
}

const createUserSlice: StateCreator<UseFormSlice, [], [], UseFormSlice> = set => ({
  values: user,
  setValues: () => {},
  handleChange: _ => new Promise(() => {}),
  valid: false,
  refs: null,
  submit: _ => new Promise(() => {}),
  isLoading: false,
  response: null,
  updateStore: (by: Partial<UseForm<User>>) =>
    set(_ => ({
      values: by.values,
      setValues: by.setValues,
      handleChange: by.handleChange,
      valid: by.valid,
      refs: by.refs,
      submit: by.submit,
      isLoading: by.isLoading,
      response: by.response
    }))
})

export const useUserStore = create<UseFormSlice>()((...args) => ({
  ...createUserSlice(...args)
}))
