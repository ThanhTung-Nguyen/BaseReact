import { useEffect, useRef } from "react"

/**
 * Do not run on first render
 * @param callback like callback in `useEffect`
 * @param dependencies like dependencies in `useEffect`
 */
export default function useUpdateEffect(callback: any, dependencies: any) {
  const firstRenderRef = useRef(true)

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    return callback()
  }, dependencies)
}
