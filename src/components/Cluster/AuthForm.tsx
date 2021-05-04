import { FC, useState, ChangeEvent } from 'react'
import { motion } from 'framer-motion'

import { Button, TextBox } from '@/components/UI'
import type { Form, Field, Fields } from '@/utils/types'
import { useLogIn, useRegister } from '@/hooks/MutationHooks'
import { useSetSession } from '@/hooks/useSession'

const AuthForm: FC<Form> = ({ type }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { login, loginRes } = useLogIn()
  const { register, registerRes } = useRegister()

  const setSession = useSetSession()

  console.log(loginRes)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>, _type: Field) => {
    switch (_type) {
      case 'user':
        setUsername(e.target.value)
        break
      case 'email':
        setEmail(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      case 'confirmPassword':
        setConfirmPassword(e.target.value)
        break
      default:
        break
    }
  }

  const submitHandler = (e: any) => {
    e.preventDefault()

    if (type === 'login') {
      login({ variables: { username, password } })
    }

    if (type === 'signup') {
      register({ variables: { username, email, password, confirmPassword } })
    }
  }

  const signupFields: Fields[] = [
    {
      type: 'user',
      placeholder: 'User Name',
      value: username,
      change: 'user',
    },
    {
      type: 'email',
      placeholder: 'Email',
      value: email,
      change: 'email',
    },
    {
      type: 'password',
      placeholder: 'Password',
      value: password,
      change: 'password',
    },
    {
      type: 'password',
      placeholder: 'Confirm Password',
      value: confirmPassword,
      change: 'confirmPassword',
    },
  ]

  const loginFields: Fields[] = [
    {
      type: 'user',
      placeholder: 'User Name',
      value: username,
      change: 'user',
    },
    {
      type: 'password',
      placeholder: 'Password',
      value: password,
      change: 'password',
    },
  ]

  if (loginRes.loading || registerRes.loading) return <p>Loading...</p>
  if (loginRes.error || registerRes.error)
    return (
      <p>Error : {loginRes.error?.message || registerRes.error?.message}</p>
    )

  return (
    <motion.div layout className="auth-modal__form">
      <h2>{type === 'signup' ? 'Create Account' : 'Log In to Tethered'}</h2>
      {type === 'signup' ? (
        <form onSubmit={submitHandler}>
          {signupFields.map((field, index) => (
            <TextBox
              key={index}
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) => changeHandler(e, field.change)}
            />
          ))}

          <Button label="Sign Up" submit />
        </form>
      ) : (
        <form onSubmit={submitHandler}>
          {loginFields.map((field, index) => (
            <TextBox
              key={index}
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) => changeHandler(e, field.change)}
            />
          ))}
          <Button label="Log In" submit />
        </form>
      )}
    </motion.div>
  )
}

export { AuthForm }
