import { useQuery, useMutation } from '@apollo/client'
import {
  GET_POSTS,
  CREATE_POST,
  LIKE_POST,
  COMMENT_POST,
  DELETE_POST,
  DELETE_COMMENT,
  PostFragment,
} from '@/utils/gql-schema'
import type { Post as PostT } from '@/utils/types'
import { client } from '@/utils/apollo'

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
        const existingPosts = client.readQuery<{ getPosts: PostT[] }>({
          query: GET_POSTS,
        })

        const newPosts = [data!.createPost, ...existingPosts!.getPosts]

        client.writeQuery({
          query: GET_POSTS,
          data: { getPosts: newPosts },
        })
      },

      onError(err) {
        console.log(err)
      },
    }
  )

  return { post, postRes }
}

export const useLikePost = () => {
  const [like, likeRes] = useMutation(LIKE_POST, {
    update(cache, { data }) {
      // We get a single item.
      const post = client.readFragment<PostT>({
        id: `Post:${data.id}`,
        fragment: PostFragment,
      })
      // Then, we update it.
      client.writeFragment({
        id: `Post:${data.id}`,
        fragment: PostFragment,
        data: {
          ...post,
          likes: data.likes,
        },
      })
    },
    onError(err) {
      console.log(err)
    },
  })

  return { like, likeRes }
}

export const useCommentPost = () => {
  const [comment, commentRes] = useMutation<
    { createComment: PostT },
    { postId: string; body: string }
  >(COMMENT_POST, {
    update: (cache, { data }) => {
      const post = client.readFragment({
        id: `Post:${data?.createComment.id}`,
        fragment: PostFragment,
      })
      // Then, we update it.
      client.writeFragment({
        id: `Post:${data?.createComment.id}`,
        fragment: PostFragment,
        data: {
          ...post,
          comments: data?.createComment.comments,
        },
      })
    },

    onError(err) {
      console.log(err)
    },
  })

  return { comment, commentRes }
}

export const useDeletePost = () => {
  const [deletePost, deletePostRes] = useMutation(DELETE_POST, {
    update: (cache, { data }) => {
      // We get a single item.
      const post = cache.readFragment<PostT>({
        id: `Post:${data.postId}`,
        fragment: PostFragment,
      })
      // Then, we update it.

      cache.writeFragment({
        id: `Post:${data.deletePost.postId}`,
        fragment: PostFragment,
        data: {
          ...post,
          _deleted: true,
        },
      })
    },
    onError(err) {
      console.log(err)
    },
    refetchQueries: [{ query: GET_POSTS }],
  })

  return { deletePost, deletePostRes }
}

export const useDeleteComment = () => {
  const [deleteComment] = useMutation<
    { deleteComment: PostT },
    { postId: string; commentId: string }
  >(DELETE_COMMENT, {
    update: (cache, { data }) => {
      // Get Post
      const post = cache.readFragment<PostT>({
        id: `Post:${data!.deleteComment.id}`,
        fragment: PostFragment,
      })

      // Then, we update it.

      cache.writeFragment({
        id: `Post:${data!.deleteComment.id}`,
        fragment: PostFragment,
        data: {
          ...post,
          comments: data?.deleteComment.comments,
        },
      })
    },
    onError(err) {
      console.log(err)
    },
  })

  return { deleteComment }
}
