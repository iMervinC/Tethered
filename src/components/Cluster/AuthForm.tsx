import { FC, useState, ChangeEvent } from 'react'
import { motion } from 'framer-motion'

import { Button, TextBox, Loader, ErrorBox } from '@/components/UI'
import type { Form, Field, Fields } from '@/utils/types'
import { useLogIn, useRegister } from '@/hooks/MutationHooks'

const AuthForm: FC<Form> = ({ type }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { login, loginRes, loginErr } = useLogIn({ username, password })
  const { register, registerRes, registerErr } = useRegister({
    username,
    email,
    password,
    confirmPassword,
  })

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
      login()
    }

    if (type === 'signup') {
      register()
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

  return (
    <motion.div layout className="auth-modal__form">
      {(loginRes.loading || registerRes.loading) && <Loader />}
      <h2>{type === 'signup' ? 'Create Account' : 'Log In to Tethered'}</h2>
      {type === 'signup' ? (
        <>
          {registerErr!.length > 0 && <ErrorBox errors={registerErr!} />}
          <form onSubmit={submitHandler}>
            {signupFields.map((field, index) => {
              return field.change === 'confirmPassword' ? (
                <TextBox
                  key={index}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => changeHandler(e, field.change)}
                  optStyle={`${password !== confirmPassword && 'textbox--red'}`}
                />
              ) : (
                <TextBox
                  key={index}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => changeHandler(e, field.change)}
                />
              )
            })}

            <Button label="Sign Up" submit />
          </form>
        </>
      ) : (
        <>
          {loginErr!.length > 0 && <ErrorBox errors={loginErr!} />}
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
        </>
      )}
    </motion.div>
  )
}

export { AuthForm }
