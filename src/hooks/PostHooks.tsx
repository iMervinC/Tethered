import { useQuery, useMutation, gql } from '@apollo/client'
import { GET_POSTS, CREATE_POST } from '@/utils/gql-schema'
import type { Post as PostT } from '@/utils/types'

export const useAllPost = () => {
  const { data, loading, error } = useQuery<{ getPosts: PostT[] }>(GET_POSTS, {
    onError: (err) => {
      console.log(err)
    },
  })

  return { data, loading, error }
}

export const createPost = () => {
  const [post, postRes] = useMutation<{ createPost: PostT }, { body: string }>(
    CREATE_POST,
    {
      update: (cache, { data }) => {
        const existingTodos = cache.readQuery<{ getPosts: PostT[] }>({
          query: GET_POSTS,
        })

        cache.writeQuery({
          query: GET_POSTS,
          data: { getPosts: [data?.createPost, ...existingTodos!.getPosts] },
        })
      },
      onError(err) {
        console.log(err)
      },
    }
  )

  return { post, postRes }
}
