import { Context, createContext, useContext } from 'react'
import { UseForm } from './types'

/**
 * createContext API that includes type definitions of useForm.
 */
export function createUseFormContext<T extends Object>() {
  const FormContext = createContext<Partial<UseForm<T> | null>>(null)
  return FormContext
}

/**
 * useContext API that includes type definitions of useForm.
 */
export function useFormContext<T extends Object>(arg: Context<Partial<UseForm<T> | null>>) {
  return useContext<Partial<UseForm<T> | null>>(arg)
}
