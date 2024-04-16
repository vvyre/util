import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, RefObject } from 'react'
import type { UseForm, UseFormArgs } from './types'

/**
 * A React hook for using form easily
 * supports textarea and inputs(type text, number, checkbox, radio)
 * @Link https://github.com/brewcold/util/blob/main/react/src/use-form/README.md
 * @example
 * function Form() {
 *  const initialValues = { email: '', content: '', ok: false }
 *  const onSubmit = fetch(...)
 *  const { values, submit, handleChange } = useForm({ initialValues, onSubmit })
 *
 *  return (
 *    <form onSubmit={submit}>
 *      <input name="email" value={values.email} onChange={handleChange} />
 *      <button>SUBMIT</button>
 *    </form>
 *  )
 * }
 */
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

  const handleChange = (e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
    const t = e.target
    const check = t.type === 'checkbox' || t.type === 'radio'
    setValues(prevData => ({ ...prevData, [t.name]: check ? t.checked : t.value }))
  }

  const [currRefValues, refs] = useRefInputInit<T>(refInputNames, values)

  const mergeValues = (values: T, convertedRefValues: Record<keyof T, any>) => {
    if (!refInputNames.length) setValues({ ...values })
    else setValues({ ...values, ...convertedRefValues })
  }

  const submit = () => setIsLoading(true)

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

  const data = {
    values,
    setValues,
    handleChange,
    refs,
    submit,
    isLoading,
    response
  }

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

  const currRefValues: () => RefValues = () => {
    const refValues: RefValues = values
    refInputNames.forEach(k => (refValues[k] = refs[k]?.current?.value || values[k]))
    return refValues
  }

  return [currRefValues, refs]
}
