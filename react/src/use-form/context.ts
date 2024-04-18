import { Context, createContext, useContext } from 'react'
import { UseForm } from './types'
import { useForm } from '.'

/**
 * createContext API that includes type definitions of useForm.
 */
export function createUseFormContext<T extends Object>() {
  //Since the results of the hook need to be stored after it is called,
  //it's not possible to store a default value at this point.
  const FormContext = createContext<UseForm<T> | Partial<UseForm<T>> | null>(null)
  return FormContext
}

/**
 * useContext API that includes type definitions of useForm.
 */
export function useFormContext<T extends Object>(
  arg: Context<UseForm<T> | Partial<UseForm<T>> | null>
) {
  const ctx = useContext<UseForm<T> | Partial<UseForm<T>> | null>(arg)
  if (!ctx) return useForm<T>({ initialValues: {} as T, onSubmit: () => {} })
  return ctx as UseForm<T>
}
