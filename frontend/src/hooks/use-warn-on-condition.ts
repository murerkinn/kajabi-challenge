import Router from 'next/router'
import { useCallback, useEffect } from 'react'

const useWarnOnCondition = (
  condition: boolean,
  callback: () => Promise<boolean>
) => {
  const handleRouteChangeStart = useCallback((url: string) => {
    let pathname = url
    if (url.indexOf('?') !== -1) {
      pathname = url.substring(0, url.indexOf('?'))
    }

    /** Always allow query changes */
    if (pathname === window.location.pathname) return

    /** Always async redirection after modal result */
    if (url.indexOf('dnp=true') !== -1) return

    setTimeout(async () => {
      const ok = await callback()

      if (ok) {
        if (url.indexOf('?') === -1) Router.router?.push(url + '?dnp=true')
        else Router.router?.push(url + '&dnp=true')
      }
    }, 1)
  }, [])

  useEffect(() => {
    if (!condition) return

    Router.events.on('routeChangeStart', handleRouteChangeStart)

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [condition, handleRouteChangeStart])
}

export default useWarnOnCondition
