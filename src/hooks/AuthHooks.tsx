import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { LOG_IN, REGISTER } from '@/utils/gql-schema'
import type { AuthUser, LogInType, RegisterType } from '@/utils/types'
import { useSetSession } from '@/hooks/useSession'

export const useLogIn = ({ username, password }: LogInType) => {
  const { newSession } = useSetSession()
  const [errors, setErrors] = useState<string[]>([])

  const [login, loginRes] = useMutation<{ login: AuthUser }>(LOG_IN, {
    update(proxy, result) {
      newSession(result.data!.login)
    },
    variables: { username, password },
    onError(err) {
      setErrors(Object.values(err.graphQLErrors[0].extensions!.errors))
    },
  })

  return { login, loginRes, loginErr: errors }
}

export const useRegister = ({
  username,
  email,
  password,
  confirmPassword,
}: RegisterType) => {
  const { newSession } = useSetSession()
  const [errors, setErrors] = useState<string[]>([])

  const [register, registerRes] = useMutation<{ register: AuthUser }>(
    REGISTER,
    {
      update(proxy, result) {
        newSession(result.data!.register)
      },
      variables: { username, email, password, confirmPassword },
      onError(err) {
        setErrors(Object.values(err.graphQLErrors[0].extensions!.errors))
      },
    }
  )

  return { register, registerRes, registerErr: errors }
}
