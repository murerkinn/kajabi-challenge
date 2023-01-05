import { ConfigProvider } from 'antd'
import { ConfigProviderProps } from 'antd/lib/config-provider'

const AntConfigProvider = ({ children, ...rest }: ConfigProviderProps) => {
  return (
    <ConfigProvider
      {...rest}
      theme={{
        token: {
          colorPrimary: '#6D5AE6',
          colorError: '#FC7063',
          colorWarning: '#FFC668',
          colorSuccess: '#98EE5D',
          colorLink: '#6D5AE6',
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default AntConfigProvider
