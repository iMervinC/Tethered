import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client/react'
import '../styles/main.scss'
import { cleint } from '@/utils/apollo'

import { SessionProvider } from '@/hooks/useSession'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={cleint}>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider>
  )
}

export default MyApp
