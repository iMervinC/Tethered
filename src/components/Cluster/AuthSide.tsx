import { FC } from 'react'
import { Button } from '@/components/UI'

const AuthSide: FC<{ type: 'login' | 'signup' }> = ({ type }) => {
  return (
    <div className="auth-modal__side">
      <h1>Tethered</h1>
      {type === 'login' && (
        <>
          <h2>Hello Friend!</h2>
          <p>Welcome! Get connected, get tethered!</p>
          <Button label="Log In" type="white" />
        </>
      )}
      {type === 'signup' && (
        <>
          <h2>Welcome Back!</h2>
          <p>To keep connected with us please login with your personal info</p>
          <Button label="Sign Up" type="white" />
        </>
      )}
    </div>
  )
}

export { AuthSide }
