import { useState, createContext, useContext, useEffect, FC } from 'react'
import { AuthUser, SessionActions, SessionType } from '@/utils/types'

const Session = createContext<SessionType>(null)
const SessionDispatch = createContext<SessionActions>({} as SessionActions)

export const SessionProvider: FC = ({ children }) => {
  const [session, setSession] = useState<AuthUser | null>(null)

  // Check if Session does not exist and check existing session in Local Storage
  useEffect(() => {
    if (!session && localStorage.getItem('Session')) {
      setSession(JSON.parse(localStorage.getItem('Session')!))
    }
  }, [])

  // Store Session to Local Storage if it does already stored
  useEffect(() => {
    if (session && !localStorage.getItem('Session')) {
      localStorage.setItem('Session', JSON.stringify(session))
    }
  }, [session])

  const newSession: SessionActions['newSession'] = (user) => {
    setSession(user)
  }

  const logOut = () => {
    setSession(null)
    //Local Storage clean up
    localStorage.removeItem('Session')
  }

  return (
    <SessionDispatch.Provider value={{ newSession, logOut }}>
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
