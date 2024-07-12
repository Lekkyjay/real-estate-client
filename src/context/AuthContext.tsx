import { createContext, useEffect, useState } from 'react'
import { AuthUser } from '../types'

interface IContext {
  currentUser: AuthUser | null
  updateUser: (data: AuthUser) => void
}

export const AuthContext = createContext({} as IContext)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(JSON.parse(localStorage.getItem('user') as string)) 

  const updateUser = (data: AuthUser) => {
    setCurrentUser(data)
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}