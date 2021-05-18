import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'https://mernq-server.herokuapp.com/',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const User = JSON.parse(localStorage.getItem('Session')!)
  // const token = User.token
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: User ? `Bearer ${User.token}` : '',
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  uri: 'https://mernq-server.herokuapp.com/',
  cache: new InMemoryCache({
    typePolicies: {
      Post: {
        fields: {
          likes: {
            merge(existing = [], incoming: any[]) {
              return [...incoming]
            },
          },
        },
      },
    },
  }),
  resolvers: { Post: { _deleted: (post) => Boolean(post._deleted) } },
})
