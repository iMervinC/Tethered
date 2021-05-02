import { FC } from 'react'
import { Button } from '@/components/UI'

const AuthForm: FC = () => {
  return (
    <div className="auth-modal__form">
      <h2>Create Account</h2>
      <form>
        <span className="textbox">
          <img src="/icons/user.svg" alt="user" />
          <input type="text" placeholder="Name" />
        </span>
        <span className="textbox">
          <img src="/icons/lock.svg" alt="lock" />
          <input type="text" placeholder="Password" />
        </span>
        <Button label="Sign Up" />
      </form>
    </div>
  )
}

export { AuthForm }
