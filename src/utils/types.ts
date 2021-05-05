import type { ChangeEventHandler } from 'react'

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
