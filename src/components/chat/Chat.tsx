import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { format } from 'timeago.js'
import { AuthContext } from '../../context/AuthContext'
import { SocketContext } from '../../context/SocketContext'
import { IChat } from '../../types'
import customAxios from '../../lib/customAxios'
import './chat.scss'

interface IProps {
  chats: IChat[]
}

export default function Chat({ chats }: IProps) {
  const [chat, setChat] = useState<IChat | null>(null)
  const { currentUser } = useContext(AuthContext)
  const { socket } = useContext(SocketContext)
  const messageEndRef = useRef<HTMLDivElement>(null)

  console.log('global value of chat...:', chat)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat])
  
  const handleOpenChat = async (id: number, username: string, avatar: string ) => {
    try {
      // const res = await apiRequest("/chats/" + id)
      // if (!res.data.seenBy.includes(currentUser.id)) {
      //   decrease()
      // }
      // setChat({ ...res.data, receiver })
      const res = await customAxios('/chats/' + id)
      setChat({ ...res.data.data, username, avatar })
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
      setChat(prev => ({ ...prev!, messages: [...prev!.messages, res.data.data]}))
      e.target.reset()
      socket?.emit('sendMessage', {
        receiverId: chat?.receiverid,
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
      socket.on('gotMessage', (data) => {
        console.log('got Message data...:', data.data.message)
        if (chat.id == data.chatid) {
          setChat((prev) => ({ ...prev!, messages: [...prev!.messages, data.data.message] }))
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
        <h1>Messages</h1>
        {chats?.map((c) => (
          <div
            className="message"
            key={c.id}
            style={{ backgroundColor: c.seenby.includes(currentUser?.id!) || chat?.id == c.id ? "white" : "#fecd514e" }}
            onClick={() => handleOpenChat(c.id, c.username, c.avatar)}
          >
            <img src={c.avatar} alt="" />
            <span>{c.username}</span>
            <p>{c.lastmessage}</p>
          </div>
        ))}
        <div className="message">
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
        </div>
      </div>
      {chat && (
        <div className="chatBox">
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