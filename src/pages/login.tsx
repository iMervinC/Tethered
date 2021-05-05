import { useEffect } from 'react'
import { AuthModal } from '@/components'
import { Layout } from '@/components/Wrappers'

import Router from 'next/router'
import useSession from '@/hooks/useSession'

const login = () => {
  const session = useSession()
  const route = Router

  useEffect(() => {
    if (session) {
      route.push('/')
    }
  }, [session])

  return (
    <Layout title="Tethered">
      <AuthModal />
    </Layout>
  )
}

export default login
