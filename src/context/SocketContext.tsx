import { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { AuthContext } from './AuthContext'

interface IContext {
  socket: Socket | null
}

export const SocketContext = createContext({} as IContext)

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useContext(AuthContext)
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    setSocket(io('http://localhost:8000'))
  }, [])

  useEffect(() => {
  currentUser && socket?.emit('newUser', currentUser.id)
  }, [currentUser, socket])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}