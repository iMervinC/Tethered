import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { InitialApolloState } from '@/utils/types'
import { useMemo } from 'react'

let apolloClient: ApolloClient<NormalizedCacheObject>

const createIsomorphicLink = () => {
  if (!(typeof window === 'undefined')) {
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

    return authLink.concat(httpLink)
  }
}

export const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphicLink(),
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
            comments: {
              merge(existing = [], incoming: any[]) {
                return [...incoming]
              },
            },
          },
        },
        Query: {
          fields: {
            getPosts: {
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

export const initializeApollo: InitialApolloState = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient()

  if (initialState) _apolloClient.cache.restore(initialState!)

  if (typeof window === 'undefined') return _apolloClient

  apolloClient = apolloClient ?? _apolloClient

  return apolloClient
}

export const useApollo = (initialState: NormalizedCacheObject) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
