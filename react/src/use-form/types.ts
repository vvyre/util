import type { ChangeEvent, RefObject } from 'react'

export type TargetElementType = HTMLInputElement | HTMLTextAreaElement
export type RefObjectType = HTMLInputElement & HTMLTextAreaElement

export interface UseForm<T extends Object> {
  values: T
  setValues: (data: T) => void
  handleChange: (e: ChangeEvent<TargetElementType>) => void
  refs: Record<keyof T, RefObject<RefObjectType>> | null
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
