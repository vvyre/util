import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, RefObject } from 'react'
import type { UseForm, UseFormArgs } from './types'

export const useForm = <T extends Object>({
  initialValues,
  onSubmit,
  validator,
  refInputNames = [],
  setExternalStoreValues = undefined,
  setExternalStoreData = undefined
}: UseFormArgs<T>): UseForm<T> => {
  const [values, setValues] = useState<typeof initialValues>({
    ...initialValues
  } as const)
  const [valid, setValid] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<unknown>(null)

  const handleInput = (
    t: EventTarget & HTMLInputElement & HTMLTextAreaElement
  ) => {
    if (
      typeof setExternalStoreValues !== 'function' &&
      typeof setExternalStoreData !== 'undefined'
    ) {
      console.error('<!> useForm: setExternalStoreValues should be a function')
    }

    const checkbox = t.type === 'checkbox'
    if (checkbox) setValues(prevData => ({ ...prevData, [t.name]: t.checked }))
    else setValues(prevData => ({ ...prevData, [t.name]: t.value }))

    //TODO: how to assure type here?
    if (typeof setExternalStoreValues === 'function')
      setExternalStoreValues({
        [t.name]: checkbox ? t.checked : t.value
      } as Partial<T>)
  }

  const cumpulsorySetValue = (data: T) => {
    if (
      typeof setExternalStoreValues !== 'function' &&
      typeof setExternalStoreData !== 'undefined'
    )
      console.error('<!> useForm: setExternalStoreValues should be a function')
    typeof setExternalStoreValues === 'function'
      ? setExternalStoreValues(data)
      : setValues(data)
  }

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => handleInput(e.target)

  const refInputNamesType = [...refInputNames] as const
  const [currRefValues, refs] = useRefInputInit<T>(refInputNamesType)
  const convertedRefValues =
    typeof currRefValues === 'function' ? currRefValues() : currRefValues

  const submit = () => {
    setIsLoading(true)
    if (typeof validator === 'function')
      setValid(validator({ ...values, ...convertedRefValues }))
  }

  useEffect(() => {
    isLoading &&
      (async () => {
        if (valid) {
          if (!refInputNames) setValues({ ...values })
          else cumpulsorySetValue({ ...values, ...convertedRefValues })
          const res = await onSubmit(values)
          setResponse(res)
          setIsLoading(false)
        }
      })()
  }, [valid])

  const data = {
    values,
    setValues,
    refValues: convertedRefValues,
    handleChange,
    valid,
    refs,
    submit,
    isLoading,
    response
  }

  const updateExternalStore = () => {
    if (
      typeof setExternalStoreData !== 'function' &&
      typeof setExternalStoreData !== 'undefined'
    )
      console.error('<!> useForm: setExternalStoreData should be a function')
    typeof setExternalStoreData === 'function' && setExternalStoreData(data)
  }

  useEffect(() => {
    updateExternalStore()
  }, [setExternalStoreData])

  return data
}

function useRefInputInit<T>(
  refInputNames: readonly (keyof T)[] = []
): [
  () => Record<(typeof refInputNames)[number], any>,
  Record<(typeof refInputNames)[number], RefObject<HTMLInputElement>>
] {
  type Refs = Record<
    (typeof refInputNames)[number],
    RefObject<HTMLInputElement>
  >
  type RefValues = Record<(typeof refInputNames)[number], any>

  const refs: Refs = {} as Refs
  refInputNames.forEach(k => (refs[k] = useRef<HTMLInputElement>(null)))

  const currRefValues: () => RefValues = () => {
    const refValues: RefValues = {} as RefValues
    refInputNames.forEach(k => (refValues[k] = refs[k]?.current?.value || ''))
    return refValues
  }

  return [currRefValues, refs]
}
