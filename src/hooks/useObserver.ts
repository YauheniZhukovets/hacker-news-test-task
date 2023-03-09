import { useEffect, useRef } from 'react'

export const useObserver = (ref: any, callback: Function) => {
  const observer = useRef<any>()

  useEffect(() => {
    if (observer.current) observer.current.disconnect()

    const cb = function (entries: any) {
      if (entries[0].isIntersecting) {
        callback()
      }
    }

    observer.current = new IntersectionObserver(cb)
    observer.current.observe(ref.current)
  }, [callback, ref])
}
