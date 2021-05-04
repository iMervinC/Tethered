import { AuthModal } from '@/components'
import { Layout } from '@/components/Wrappers'

const login = () => {
  return (
    <Layout title="Tethered">
      <AuthModal />
    </Layout>
  )
}

export default login
