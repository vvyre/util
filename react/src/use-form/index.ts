import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, RefObject } from 'react'
import type { UseForm, UseFormArgs } from './types'
export const useForm = <T extends Object>({
  initialValues,
  onSubmit,
  validator,
  refInputNames = []
}: UseFormArgs<T>): UseForm<T> => {
  const [values, setValues] = useState<typeof initialValues>(initialValues)
  const [valid, setValid] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<unknown>(null)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const t = e.target
      if (t instanceof HTMLInputElement && (t.type === 'checkbox' || t.type === 'radio')) {
        setValues(prevData => ({ ...prevData, [t.name]: t.checked }))
      } else {
        setValues(prevData => ({ ...prevData, [t.name]: t.value }))
      }
    },
    [values]
  )

  const [currRefValues, refs] = useRefInputInit<T>(refInputNames, values)

  const mergeValues = (values: T, convertedRefValues: Record<keyof T, any>) => {
    if (!refInputNames.length) setValues({ ...values })
    else setValues({ ...values, ...convertedRefValues })
  }

  const submit = () => useCallback(() => setIsLoading(true), [])

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
function useRefInputInit<T>(
  refInputNames: (keyof T)[] = [],
  values: T
): [
  () => Record<(typeof refInputNames)[number], any>,
  Record<(typeof refInputNames)[number], RefObject<HTMLInputElement & HTMLTextAreaElement>>
] {
  type Refs = Record<
    (typeof refInputNames)[number],
    RefObject<HTMLInputElement & HTMLTextAreaElement>
  >
  type RefValues = Record<(typeof refInputNames)[number], any>

  const refs: Refs = {} as Refs
  refInputNames.forEach(k => (refs[k] = useRef<HTMLInputElement & HTMLTextAreaElement>(null)))

  const currRefValues: () => RefValues = useCallback(() => {
    const refValues: RefValues = values
    refInputNames.forEach(k => (refValues[k] = refs[k]?.current?.value || values[k]))
    return refValues
  }, [])
  return [currRefValues, refs]
}
