import type { ChangeEventHandler } from 'react'

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
}

export type Field = 'user' | 'email' | 'password' | 'confirmPassword'

export type Fields = {
  type: TextBox['type']
  placeholder: string
  value: string
  change: Field
}

export type CheckPass = (pass: string, confPass: string) => boolean
