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
