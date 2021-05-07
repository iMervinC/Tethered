import { useQuery, ApolloError } from '@apollo/client'
import { GET_POSTS } from '@/utils/gql-schema'
import type { Post } from '@/utils/types'

export const useAllPost = () => {
  const { data, loading, error } = useQuery<{ getPosts: Post[] }>(GET_POSTS, {
    onError: (err) => {
      console.log(err)
    },
  })

  return { data, loading, error }
}
