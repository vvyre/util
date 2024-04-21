import type { ChangeEvent, RefObject } from 'react'

export interface UseForm<T extends Object> {
  values: T
  setValues: (data: T) => void
  handleChange: (e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => void
  refs: Record<keyof T, RefObject<HTMLInputElement>> | null
  refValues: Record<keyof T, any>
  submit: () => void
  isLoading: boolean
  response: unknown
}

export interface UseFormArgs<T extends Object> {
  initialValues: T
  onSubmit: (data: T) => any
  validator?: (data: T) => boolean
  refInputNames?: (keyof T)[]
  updateStore?: (data: Partial<UseForm<T>>) => void
}
