import { AuthSide, AuthForm } from '@/components/Cluster'

const AuthModal = () => {
  return (
    <div className="auth-modal">
      <AuthSide type="login" />
      <AuthForm />
    </div>
  )
}

export { AuthModal }
