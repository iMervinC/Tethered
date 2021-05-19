import Link from 'next/link'
import { Button, PostHeader } from '@/components/UI'
import useSession, { useSetSession } from '@/hooks/useSession'

const Nav = () => {
  const { logOut } = useSetSession()
  const session = useSession()

  if (!session) return null

  return (
    <div className="nav">
      <nav className="container">
        <Link href="/">
          <a>Tethered</a>
        </Link>
        <span>
          <PostHeader name={session.username} />
          <Button label="Log Out" type="small" cb={logOut} />
        </span>
      </nav>
    </div>
  )
}

export { Nav }
