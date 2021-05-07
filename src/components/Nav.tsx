import Link from 'next/link'
import { Button } from '@/components/UI'
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
        <Button label="Log Out" type="small" cb={logOut} />
      </nav>
    </div>
  )
}

export { Nav }
