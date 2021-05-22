import { useState, Dispatch, SetStateAction } from 'react'
import { useQuery, useMutation, ApolloError } from '@apollo/client'
import {
  GET_POSTS,
  CREATE_POST,
  LIKE_POST,
  COMMENT_POST,
  DELETE_POST,
  DELETE_COMMENT,
  PostFragment,
} from '@/utils/gql-schema'
import type { Post as PostT, MyErrors } from '@/utils/types'
import { initializeApollo } from '@/utils/apollo'

const ErrorHandler = (
  err: ApolloError,
  setter: Dispatch<SetStateAction<MyErrors | null>>
) => {
  setter({
    code: err.graphQLErrors[0].extensions!.code,
    errors: Object.values(err.graphQLErrors[0].extensions!.errors) || null,
  })
}

const client = initializeApollo()

export const useAllPost = () => {
  const [error, setError] = useState<MyErrors | null>(null)
  const { data, loading } = useQuery<{ getPosts: PostT[] }>(GET_POSTS, {
    onError: (err) => ErrorHandler(err, setError),
  })

  return { data, loading, error }
}

export const useCreatePost = () => {
  const [postErr, setPostErr] = useState<MyErrors | null>(null)

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

      onError: (err) => ErrorHandler(err, setPostErr),
    }
  )

  return { post, postRes, postErr }
}

export const useLikePost = () => {
  const [likeErr, setLikeErr] = useState<MyErrors | null>(null)

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
    onError: (err) => {},
  })

  return { like, likeRes, likeErr }
}

export const useCommentPost = () => {
  const [commentErr, setCommentErr] = useState<MyErrors | null>(null)
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

    onError: (err) => ErrorHandler(err, setCommentErr),
  })

  return { comment, commentRes, commentErr }
}

export const useDeletePost = () => {
  const [deletePostErr, setDeletePostErr] = useState<MyErrors | null>(null)
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
    onError: (err) => {},
    refetchQueries: [{ query: GET_POSTS }],
  })

  return { deletePost, deletePostRes, deletePostErr }
}

export const useDeleteComment = () => {
  const [deleteCommentErr, setDeleteCommentErr] =
    useState<MyErrors | null>(null)

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
    onError: (err) => ErrorHandler(err, setDeleteCommentErr),
  })

  return { deleteComment, deleteCommentErr }
}
