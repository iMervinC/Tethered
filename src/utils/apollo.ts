import { ApolloClient, InMemoryCache } from '@apollo/client'

export const cleint = new ApolloClient({
  uri: 'https://mernq-server.herokuapp.com/',
  cache: new InMemoryCache(),
})
