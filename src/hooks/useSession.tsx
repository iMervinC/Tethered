import {
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
  FC,
  Dispatch,
  SetStateAction,
} from 'react'
import { AuthUser } from '@/utils/types'

type SessionType = AuthUser | null
type SessionDispatchType = Dispatch<SetStateAction<AuthUser | null>> | null

const Session = createContext<SessionType>(null)
const SessionDispatch = createContext<SessionDispatchType>(null)

export const SessionProvider: FC = ({ children }) => {
  const [session, setSession] = useState<AuthUser | null>(null)

  useEffect(() => {
    session && localStorage.setItem('Session', JSON.stringify(session))
  }, [session])

  return (
    <SessionDispatch.Provider value={setSession}>
      <Session.Provider value={session}>{children}</Session.Provider>
    </SessionDispatch.Provider>
  )
}

export const useSetSession = () => {
  return useContext(SessionDispatch)
}

const useSession = () => {
  return useContext(Session)
}

export default useSession
