import type { DependencyList, EffectCallback } from 'react'
import { useEffect, useLayoutEffect } from 'react'
import { isServer } from '../../../ts/src'

export const useIsomorphicLayoutEffect = (effect: EffectCallback, deps?: DependencyList) =>
  isServer() ? useEffect(effect, deps) : useLayoutEffect(effect, deps)
