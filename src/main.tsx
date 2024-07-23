import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { SocketContextProvider } from './context/SocketContext.tsx'
import { NotificationContextProvider } from './context/notificationContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
