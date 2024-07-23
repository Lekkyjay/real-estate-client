import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { NotificationContext } from '../../context/notificationContext'
import './navbar.scss'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { currentUser } = useContext(AuthContext)
  const { count } = useContext(NotificationContext) 

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/vite.svg" alt="" />
          <span>OceanEstate</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Agents</Link>
      </div>
      <div className="right">
        {currentUser
        ? (
            <div className="user">
              <img src={currentUser.avatar} alt="" />
              <span>{currentUser.username}</span>
              <Link to="/profile" className="profile">
                <div className="notification">{count}</div>
                <span>Profile</span>
              </Link>
            </div>
          ) 
        : (
            <>
              <Link to="/login">Sign in</Link>
              <Link to="/register" className="register">
                Sign up
              </Link>
            </>
          )
        }
        <div className="menuIcon">
          <img src="/menu.png" alt="" onClick={() => setOpen((prev) => !prev)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Agents</Link>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </nav>
  )
}