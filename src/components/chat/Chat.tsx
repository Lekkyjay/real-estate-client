import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { format } from 'timeago.js'
import { AuthContext } from '../../context/AuthContext'
import { SocketContext } from '../../context/SocketContext'
import { IChat } from '../../types'
import customAxios from '../../lib/customAxios'
// import { NotificationContext } from '../../context/notificationContext'
import './chat.scss'
import { useAppDispatch } from '../../redux/store'
import { decrease } from '../../redux/notificationSlice'

interface IProps {
  chats: IChat[]
}

export default function Chat({ chats }: IProps) {
  const [chat, setChat] = useState<IChat | null>(null)
  const { currentUser } = useContext(AuthContext)
  const { socket } = useContext(SocketContext)
  // const { dispatch } = useContext(NotificationContext)
  const messageEndRef = useRef<HTMLDivElement>(null)

  const dispatch = useAppDispatch()

  // console.log('chats fetched with the profilePageLoader...:', chats)
  // console.log('current chat state...:', chat)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat])
  
  const handleOpenChat = async (id: number, username: string, avatar: string, partnerid: number ) => {
    try {
      const res = await customAxios('/chats/' + id)
      // console.log('response from getChat...:', res.data.data)
      // console.log('seenby does not include currentUser.id...:', !res.data.data.seenby.includes(currentUser?.id))
      // console.log('seenby...:', res.data.data.seenby)
      // console.log('currentUser.id...:', currentUser?.id)
      if (!res.data.data.seenby.includes(currentUser?.id)) {
        dispatch(decrease())
      }
      setChat({ ...res.data.data, username, avatar, partnerid })
    } 
    catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const message = formData.get('message')
    if (!message) return
    try {
      const res = await customAxios.post(`/chats/${chat?.id}/msg`, { message })   //returns a message obj after saving it to db
      // console.log('response from create message controller....:', res.data.data)
      setChat(prev => {
        // console.log('setChat prev state....:', prev)
        return { ...prev!, messages: [...prev!.messages, res.data.data]}
      })
      e.target.reset()
      socket?.emit('sendMessage', {
        receiverId: chat?.partnerid,
        data: res.data.data,
      })
    } 
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const read = async () => {
      try {
        await customAxios.put('/chats/read/' + chat?.id)    //readChat controller updates seenBy array in chats table
      } 
      catch (err) {
        console.log(err)
      }
    }

    if (chat && socket) {
      // console.log('chat && socket ran')
      socket.on('gotMessage', (data) => {
        // console.log('gotten Message...:', data.data)
        // console.log('chat.id == data.data.chatid....:', chat.id == data.data.chatid)
        // console.log('chat.id...:', chat.id)
        // console.log('data.data.chatid....:', data.data.chatid)
        if (chat.id == data.data.chatid) {
          setChat((prev) => ({ ...prev!, messages: [...prev!.messages, data.data] }))
          read()
        }
      })
    }
    return () => {
      socket?.off('gotMessage')
    }
  }, [socket, chat])

  return (
    <div className="chat">
      <div className="messages">
        <h1>Chats</h1>
        {chats?.map((c) => (
          <div
            className="message"
            key={c.id}
            style={{ backgroundColor: c.seenby.includes(currentUser?.id!) || chat?.id == c.id ? "white" : "#fecd514e" }}
            onClick={() => handleOpenChat(c.id, c.username, c.avatar, c.partnerid)}
          >
            <img src={c.avatar} alt="" />
            <span>{c.username +'  ' + c.id}</span>
            <p>{c.lastmessage}</p>
          </div>
        ))}
        {/* <div className="message">
          <img
            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
          <span>John Doe</span>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
        <div className="message">
          <img
            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
          <span>John Doe</span>
          <p>Lorem ipsum dolor sit amet...</p>
        </div> */}
      </div>
      {chat && (
        <div className="chatBox" key={chat.id}>
          <div className="top">
            <div className="user">
              <img src={chat.avatar} alt="" />
              {chat.username}
            </div>
            <span className="close" onClick={()=>setChat(null)}>X</span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                key={message.id}
                className="chatMessage"
                style={{ 
                  alignSelf: message.senderid == currentUser?.id ? "flex-end" : "flex-start",
                  textAlign: message.senderid == currentUser?.id ? "right" : "left"
                }}                
              >
                <p>{message.message}</p>
                <span>{format(message.created_at)}</span>
              </div>
            ))}            
            {/* <div className="chatMessage own">
              <p>Lorem ipsum dolor sit amet</p>
              <span>1 hour ago</span>
            </div> */}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="message"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  )
}