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
  query {
    getPosts {
      id
      username
      body
      createdAt
      likes {
        username
      }
      comments {
        username
        body
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
