import { ChangeEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import customAxios from '../../lib/customAxios'
import './profileUpdate.scss'
import UploadWidget from '../../components/cloudinaryUploadWidget/CloudinaryUploadWidget'

export default function ProfileUpdate() {
  const { currentUser, updateUser } = useContext(AuthContext)
  const [error, setError] = useState('')
  const [avatar, setAvatar] = useState<string[]>([])

  const navigate = useNavigate()

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const { username, email, password } = Object.fromEntries(formData)

    try {
      const res = await customAxios.put(`/users/${currentUser?.id}`, { username, email, password, avatar: avatar[0] })
      updateUser(res.data.data)
      navigate('/profile')
    } 
    catch (err: any) {
      console.log(err)
      setError(err.response.data.message)
    }
  }
  
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser?.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser?.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser?.avatar} alt="" className="avatar" />
        <UploadWidget
          uwConfig={{
            cloudName: "dtkdchtfm",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars"
          }}
          setUpload={setAvatar}
        />
      </div>
    </div>
  )
}