import { useState } from 'react'
import { AuthSide, AuthForm } from '@/components/Cluster'

const AuthModal = () => {
  const [toggleModal, setToggleModal] = useState(true)

  return (
    <div className={`auth-modal ${toggleModal && 'auth-modal--switch'}`}>
      <AuthSide
        type={toggleModal ? 'login' : 'signup'}
        cb={setToggleModal}
        toggle={toggleModal}
      />
      <AuthForm type={toggleModal ? 'login' : 'signup'} />
    </div>
  )
}

export { AuthModal }
