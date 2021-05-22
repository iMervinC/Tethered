import type { ChangeEventHandler } from 'react'
import type { NormalizedCacheObject, ApolloClient } from '@apollo/client'

export type InitialApolloState = (
  initialState?: NormalizedCacheObject | null
) => ApolloClient<NormalizedCacheObject>
export interface AuthUser {
  username: string
  email: string
  token: string
}
export interface Form {
  type: 'login' | 'signup'
}

export interface Authform {
  user: string
  email?: string
  password: string
  confirmPassword?: string
}

export interface TextBox {
  placeholder: string
  type: 'user' | 'password' | 'email'
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  optStyle?: string
}

export type Field = 'user' | 'email' | 'password' | 'confirmPassword'

export type Fields = {
  type: TextBox['type']
  placeholder: string
  value: string
  change: Field
}

export type CheckPass = (pass: string, confPass: string) => boolean

export type SessionType = AuthUser | null

export interface SessionActions {
  newSession: (user: AuthUser) => void
  logOut: () => void
}

export interface LogInType {
  username: string
  password: string
}
export interface RegisterType {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface Like {
  username: string
  createdAt?: string
}

export interface Comment {
  id: string
  username: string
  body: string
  createdAt: string
}

export interface Post {
  id: string
  username: string
  body: string
  createdAt: string
  likes: Like[]
  comments: Comment[]
  __typename?: string
  _deleted?: boolean
}

export interface MyErrors {
  code: 'UNAUTHENTICATED' | 'BAD_USER_INPUT'
  errors?: string[] | null
}
