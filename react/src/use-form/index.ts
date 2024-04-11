import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, RefObject } from 'react'
import type { UseForm, UseFormArgs } from './types'

export const useForm = <T extends Object>({
  initialValues,
  onSubmit,
  validator,
  refInputNames = [],
  updateStore = undefined
}: UseFormArgs<T>): UseForm<T> => {
  const [values, setValues] = useState<typeof initialValues>(initialValues)
  const [valid, setValid] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<unknown>(null)

  const cumpulsorySetValue = (data: T) => {
    typeof updateStore === 'function' ? updateStore({ values: data }) : setValues(data)
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
    const t = e.target
    const checkbox = t.type === 'checkbox'
    if (typeof updateStore === 'function') {
      updateStore({
        values: {
          ...values,
          [t.name]: checkbox ? t.checked : t.value
        }
      })
    }
    setValues(prevData => ({ ...prevData, [t.name]: checkbox ? t.checked : t.value }))
  }

  const readonlyRefInputNames = [...refInputNames] as const
  const [currRefValues, refs] = useRefInputInit<T>(readonlyRefInputNames, values)

  const mergeValues = (values: T, convertedRefValues: Record<keyof T, any>) => {
    if (!refInputNames) setValues({ ...values })
    else cumpulsorySetValue({ ...values, ...convertedRefValues })
  }

  const submit = () => setIsLoading(true)

  useEffect(() => {
    if (isLoading) mergeValues(values, currRefValues)
    setValid(typeof validator === 'function' ? validator(values) : true)
  }, [isLoading])

  useEffect(() => {
    async function POST() {
      const res = await onSubmit(values)
      setResponse(res)
      setIsLoading(false)
    }

    if (isLoading && valid) POST()
  }, [isLoading, valid])

  const data = {
    values,
    setValues: cumpulsorySetValue,
    handleChange,
    valid,
    refs,
    submit,
    isLoading,
    response
  }

  const updateExternalStore = () => {
    if (typeof updateStore !== 'function' && typeof updateStore !== 'undefined')
      console.error('<!> useForm: updateStore should be a function')
    typeof updateStore === 'function' && updateStore(data)
  }

  useEffect(() => {
    updateExternalStore()
  }, [setValues, handleChange, refs, submit, response, updateStore])

  return data
}

function useRefInputInit<T>(
  refInputNames: readonly (keyof T)[] = [],
  values: T
): [
  Record<(typeof refInputNames)[number], any>,
  Record<(typeof refInputNames)[number], RefObject<HTMLInputElement>>
] {
  type Refs = Record<(typeof refInputNames)[number], RefObject<HTMLInputElement>>
  type RefValues = Record<(typeof refInputNames)[number], any>

  const refs: Refs = {} as Refs
  refInputNames.forEach(k => (refs[k] = useRef<HTMLInputElement>(null)))

  const currRefValues: RefValues = useMemo(() => {
    const refValues: RefValues = values
    refInputNames.forEach(k => (refValues[k] = refs[k]?.current?.value || values[k]))
    return refValues
  }, [refInputNames])

  return [currRefValues, refs]
}
