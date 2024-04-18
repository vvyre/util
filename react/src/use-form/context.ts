import { Context, createContext, useContext } from 'react'
import { UseForm } from './types'
import { useForm } from './'

/**
 * createContext API that includes type definitions of useForm.
 */
export function createUseFormContext<T extends Object, K = {}>() {
  const FormContext = createContext<((UseForm<T> | Partial<UseForm<T>>) & K) | null>(null)
  return FormContext
}

/**
 * useContext API that includes type definitions of useForm.
 */
export function useFormContext<T extends Object, K = {}>(
  arg: Context<((UseForm<T> | Partial<UseForm<T>>) & K) | null>
) {
  const ctx = useContext<((UseForm<T> | Partial<UseForm<T>>) & K) | null>(arg)
  if (!ctx) return useForm<T>({ initialValues: {} as T, onSubmit: () => {} })
  return ctx as UseForm<T> & K
}
