import { notification } from 'antd'
import debounce from 'lodash/debounce'
import { useCallback, useEffect, useReducer } from 'react'

import { transposeError } from '@/lib/error-handler'

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SERVICE_INIT':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'SERVICE_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      }
    case 'SERVICE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      throw new Error('Unhandled action')
  }
}

const usePaginatedService = (service: any, deps: any[] = []) => {
  const [{ data, loading, error }, dispatch] = useReducer(reducer, {
    data: [],
    loading: false,
    error: null,
  })

  const callService = useCallback(
    debounce(async (ignore = false) => {
      dispatch({ type: 'SERVICE_INIT' })

      try {
        if (!ignore) {
          const res = await service()

          dispatch({ type: 'SERVICE_SUCCESS', payload: res })
        }
      } catch (e) {
        dispatch({ type: 'SERVICE_FAILURE', payload: e })

        notification.error({
          message: 'Failed',
          description: transposeError(e),
        })
      }
    }, 300),
    deps
  )

  useEffect(() => {
    let ignore = false

    callService(ignore)

    return () => {
      ignore = true
    }
  }, [callService])

  return {
    data: data ? data.data : [],
    error,
    pagination: {
      current: data ? data.page : 1,
      per_page: data ? data.per_page : 10,
      total: data ? data.total : 0,
      total_pages: data ? data.total_pages : 0,
    },
    loading,
  }
}

export default usePaginatedService
