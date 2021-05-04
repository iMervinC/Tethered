import { useMutation } from '@apollo/client/react'
import { LOG_IN, REGISTER } from '@/utils/gql-schema'
import type { AuthUser } from '@/utils/types'

export const useLogIn = () => {
  const [login, loginRes] = useMutation<{ login: AuthUser }>(LOG_IN)

  return { login, loginRes }
}

export const useRegister = () => {
  const [register, registerRes] = useMutation<{ register: AuthUser }>(REGISTER)

  return { register, registerRes }
}
