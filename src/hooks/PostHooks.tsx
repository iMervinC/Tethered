import { useQuery, useMutation } from '@apollo/client'
import { GET_POSTS, CREATE_POST } from '@/utils/gql-schema'
import type { Post } from '@/utils/types'

export const useAllPost = () => {
  const { data, loading, error } = useQuery<{ getPosts: Post[] }>(GET_POSTS, {
    onError: (err) => {
      console.log(err)
    },
  })

  return { data, loading, error }
}

export const createPost = () => {
  const [post, postRes] = useMutation<{ createPost: Post }, { body: string }>(
    CREATE_POST,
    {
      onError(err) {
        console.log(err)
      },
    }
  )

  return { post, postRes }
}
