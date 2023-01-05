import { notification } from 'antd'

export const transposeError = (e: any) => {
  const errorMessage =
    e?.response?.data?.message || e?.message || 'An error occured'

  return errorMessage
}

export const handleError = (error: any) => {
  const message = transposeError(error)

  notification.error({
    message,
  })
}
