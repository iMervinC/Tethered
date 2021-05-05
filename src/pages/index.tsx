import { useEffect } from 'react'
import Router from 'next/router'

import { Button } from '@/components/UI'
import { Layout } from '@/components/Wrappers'
import useSession, { useSetSession } from '@/hooks/useSession'

const Home = () => {
  const session = useSession()
  const { logOut } = useSetSession()

  const route = Router

  useEffect(() => {
    !session && route.push('/login')
  }, [session])

  console.log(session)

  if (!session) return null

  return (
    <Layout title="Welcome">
      <h1>Home Page</h1>
      <Button label="Log Out" cb={logOut} />
    </Layout>
  )
}

export default Home
