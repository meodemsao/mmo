import { useEffect } from 'react'

export default function useRefresh(history: any, path: string, resetRoute: string) {
  let handler: any

  const refresh = () => {
    history.push(resetRoute)

    handler = setTimeout(() => history.push(path), 10)
  }

  useEffect(() => {
    return () => handler && clearTimeout(handler)
  }, [handler])

  return refresh
}
