import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cards from '../../components/cards/Cards'
import Chat from '../../components/chat/Chat'
import customAxios from '../../lib/customAxios'
import { AuthContext } from '../../context/AuthContext'
import './profile.scss'

export default function Profile() {
  const { updateUser, currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await customAxios.post('/auth/logout')
      updateUser(null)
      navigate('/')
    } 
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar: <img src={currentUser?.avatar} alt="" />
            </span>
            <span>
              Username: <b>{currentUser?.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser?.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <Cards />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Cards />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  )
}