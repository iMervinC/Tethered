import { useQuery, useMutation, ApolloCache } from '@apollo/client'
import {
  GET_POSTS,
  CREATE_POST,
  LIKE_POST,
  COMMENT_POST,
} from '@/utils/gql-schema'
import type { Post as PostT } from '@/utils/types'

export const useAllPost = () => {
  const { data, loading, error } = useQuery<{ getPosts: PostT[] }>(GET_POSTS, {
    onError: (err) => {
      console.log(err)
    },
  })

  return { data, loading, error }
}

export const useCreatePost = () => {
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

const updatePost = (cache: ApolloCache<any>, { data }: any) => {
  const existingPosts = cache.readQuery<{ getPosts: PostT[] }>({
    query: GET_POSTS,
  })

  const Posts = [...existingPosts!.getPosts]

  const post = Posts.findIndex((post) => post.id === data!.id)

  Posts[post] = data!

  cache.writeQuery({
    query: GET_POSTS,
    data: { getPosts: [...Posts] },
  })
}

export const useLikePost = () => {
  const [like, likeRes] = useMutation(LIKE_POST, {
    update: updatePost,
    onError(err) {
      console.log(err)
    },
  })

  return { like, likeRes }
}

export const useCommentPost = () => {
  const [comment, commentRes] = useMutation<PostT>(COMMENT_POST, {
    update: (cache, { data }) => {
      const existingPosts = cache.readQuery<{ getPosts: PostT[] }>({
        query: GET_POSTS,
      })

      const Posts = [...existingPosts!.getPosts]

      const post = Posts.findIndex((post) => post.id === data!.id)

      Posts[post] = data!

      cache.writeQuery({
        query: GET_POSTS,
        data: { getPosts: [...Posts] },
      })
    },

    onError(err) {
      console.log(err)
    },
  })

  return { comment, commentRes }
}
