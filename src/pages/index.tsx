import { useEffect } from 'react'
import Router from 'next/router'
import { Layout } from '@/components/Wrappers'
import useSession from '@/hooks/useSession'

const Home = () => {
  const session = useSession()

  const route = Router

  useEffect(() => {
    !session && route.push('/login')
  }, [])

  if (!session) return null

  return (
    <Layout title="Welcome">
      <h1>Home Page</h1>
    </Layout>
  )
}

export default Home
