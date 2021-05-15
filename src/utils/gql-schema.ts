import { gql } from '@apollo/client'

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
  query GetPosts {
    getPosts {
      id
      username
      body
      createdAt
      likes {
        username
      }
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`

export const CREATE_POST = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
      id
      username
      createdAt
      body
    }
  }
`

export const DELETE_POST = gql``

export const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
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
    }
  }
`

export const COMMENT_POST = gql`
  mutation CommentPost($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
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
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation DeleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
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
    }
  }
`
