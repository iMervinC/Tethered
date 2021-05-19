import { gql } from '@apollo/client'

export const PostFragment = gql`
  fragment PostParts on Post {
    id
    body
    createdAt
    username
    likes {
      username
    }
    comments {
      id
      body
      username
      createdAt
    }
    _deleted @client
  }
`

export const LOG_IN = gql`
  mutation LogIn($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      token
    }
  }
`

export const REGISTER = gql`
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      username
      email
      token
    }
  }
`

export const GET_POSTS = gql`
  ${PostFragment}
  query GetPosts {
    getPosts {
      ...PostParts
    }
  }
`

export const CREATE_POST = gql`
  ${PostFragment}
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
      ...PostParts
    }
  }
`

export const LIKE_POST = gql`
  ${PostFragment}
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      ...PostParts
    }
  }
`

export const COMMENT_POST = gql`
  ${PostFragment}
  mutation CommentPost($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      ...PostParts
    }
  }
`

export const DELETE_COMMENT = gql`
  ${PostFragment}
  mutation DeleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      ...PostParts
    }
  }
`

export const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId) {
      postId
      status
    }
  }
`
