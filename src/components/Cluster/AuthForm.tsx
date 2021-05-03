import { FC, useState, ChangeEvent } from 'react'
import { Button, TextBox } from '@/components/UI'
import type { Form, Field, Fields } from '@/utils/types'
import { motion, AnimatePresence } from 'framer-motion'

const AuthForm: FC<Form> = ({ type }) => {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const changeHandler = (e: ChangeEvent<HTMLInputElement>, _type: Field) => {
    switch (_type) {
      case 'user':
        setUser(e.target.value)
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
    type === 'login' && console.log({ user, password })

    type === 'signup' && console.log({ user, email, password, confirmPassword })
  }

  const signupFields: Fields[] = [
    {
      type: 'user',
      placeholder: 'Name',
      value: user,
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
      placeholder: 'Name',
      value: user,
      change: 'user',
    },
    {
      type: 'password',
      placeholder: 'Password',
      value: password,
      change: 'password',
    },
  ]

  const FormAnim = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

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
