import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client/react'
import '../styles/main.scss'
import { useApollo } from '@/utils/apollo'
import { Nav } from '@/components'
import { SessionProvider } from '@/hooks/useSession'

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <Nav />
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider>
  )
}

export default MyApp
