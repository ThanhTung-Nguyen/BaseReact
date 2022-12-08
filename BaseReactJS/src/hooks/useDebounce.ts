import { useEffect } from "react"
import useTimeout from "./useTimeout"

/**
 * Use like useEffect, add delay time before invoke callback
 * @param callback like callback in `useEffect`
 * @param dependencies like dependencies in `useEffect`
 * @param delay delay time
 */
export default function useDebounce(
  callback: any,
  dependencies: any,
  delay: number
) {
  const { reset, clear } = useTimeout(callback, delay)
  useEffect(reset, [...dependencies, reset])
  useEffect(clear, [])
}
