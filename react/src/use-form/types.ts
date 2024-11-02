import type { ChangeEvent, Dispatch, RefObject, SetStateAction } from 'react'

export interface UseForm<T extends Record<string, any>> {
  values: T
  setValues: Dispatch<SetStateAction<T>>
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  refs: Record<string, RefObject<HTMLInputElement | HTMLTextAreaElement>> | null
  refValues: Record<string, any>
  submit: () => void
  isLoading: boolean
  response: unknown
}

export interface UseFormArgs<T extends Record<string, any>> {
  initialValues: T
  onSubmit: (data: T) => any | (() => {})
  validator?: (data: T) => boolean
  refInputNames?: string[]
}
