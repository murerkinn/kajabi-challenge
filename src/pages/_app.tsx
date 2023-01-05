import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

const AntConfigProvider = dynamic(
  () => import('@/components/ant-config-provider'),
  { ssr: false }
)

function App({ Component, pageProps }: AppProps) {
  return (
    <AntConfigProvider>
      <Component {...pageProps} />
    </AntConfigProvider>
  )
}

export default App
