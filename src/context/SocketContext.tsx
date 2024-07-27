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

  //firsttime the application loads a socket connection is established with the server. a socketId is generated
  //a new socketId is generated anytime the browser is reloaded or when the app is rerendered(not sure about this one)  
  //this happens anytime i save changes to my code as the vite hot-reload causes my browser to reload
  useEffect(() => {
    setSocket(io('http://localhost:8000'))
  }, [])

  //whenever a user signs in, a userId is associated with the socketId generated above
  //associated userid remains thesame even when socketId changes. userId is persisted with localStorage.
  useEffect(() => {
  currentUser && socket?.emit('newUser', currentUser.id)
  }, [currentUser, socket])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}