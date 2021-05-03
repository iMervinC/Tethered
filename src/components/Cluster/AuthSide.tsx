import React, { FC, Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/UI'
import { motion, AnimatePresence } from 'framer-motion'

interface AuthSideT {
  type: 'login' | 'signup'
  toggle: boolean
  cb: Dispatch<SetStateAction<boolean>>
}

const AuthSide: FC<AuthSideT> = ({ type, cb, toggle }) => {
  const clickHandler = () => {
    cb((toggle) => !toggle)
  }

  return (
    <motion.div layout className="auth-modal__side left-border">
      <h1>Tethered</h1>

      {type === 'signup' && (
        <>
          <h2>Hello Friend!</h2>
          <p>Welcome! Get connected, get tethered!</p>
          <Button label="Log In" type="white" cb={clickHandler} />
        </>
      )}
      {type === 'login' && (
        <>
          <h2>Welcome Back!</h2>
          <p>To keep connected with us please login with your personal info</p>
          <Button label="Sign Up" type="white" cb={clickHandler} />
        </>
      )}
    </motion.div>
  )
}

export { AuthSide }
