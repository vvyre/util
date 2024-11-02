import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, RefObject } from 'react'
import type { UseForm, UseFormArgs } from './types'
export const useForm = <T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validator,
  refInputNames = []
}: UseFormArgs<T>): UseForm<T> => {
  const [values, setValues] = useState<typeof initialValues>(initialValues)
  const [valid, setValid] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<unknown>(null)

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const t = e.target
    if (t instanceof HTMLInputElement && (t.type === 'checkbox' || t.type === 'radio')) {
      setValues(prevData => ({ ...prevData, [t.name]: t.checked }))
    } else {
      setValues(prevData => ({ ...prevData, [t.name]: t.value }))
    }
  }, [])

  const [currRefValues, refs] = useRefInputInit<T>(refInputNames, values)

  const mergeValues = (values: T, convertedRefValues: Record<keyof T, any>) => {
    if (!refInputNames.length) setValues({ ...values })
    else setValues({ ...values, ...convertedRefValues })
  }

  const submit = useCallback(() => setIsLoading(true), [])

  useEffect(() => {
    if (isLoading) mergeValues(values, currRefValues())
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

  const data = useMemo(() => {
    return {
      values,
      setValues,
      handleChange,
      refs,
      refValues: currRefValues(),
      submit,
      isLoading,
      response
    }
  }, [values, handleChange, refs, currRefValues, isLoading, response])

  return data
}

function useRefInputInit<T extends Record<string, any>>(
  refInputNames: string[] = [],
  values: T
): [() => Record<keyof T, any>, Record<string, RefObject<HTMLInputElement | HTMLTextAreaElement>>] {
  const refs: Record<string, RefObject<HTMLInputElement | HTMLTextAreaElement>> = {}
  refInputNames.forEach(k => (refs[k] = useRef<HTMLInputElement | HTMLTextAreaElement>(null)))

  const currRefValues = useCallback(() => {
    let refValues: Record<keyof T, any> = { ...values }
    if (refInputNames.length) return refValues

    const newValues = new Map()
    refInputNames.forEach(k => {
      newValues.set([k], refs[k]?.current?.value || values[k])
    })
    refValues = Object.fromEntries(newValues)
    return refValues
  }, [values, refs, refInputNames])

  return [currRefValues, refs]
}
