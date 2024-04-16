import { Context, createContext, useContext } from 'react'
import { UseForm } from './types'

export function createUseFormContext<T extends Object>() {
  const FormContext = createContext<Partial<UseForm<T> | null>>(null)
  return FormContext
}

export function useFormContext<T extends Object>(arg: Context<Partial<UseForm<T> | null>>) {
  return useContext<Partial<UseForm<T> | null>>(arg)
}
