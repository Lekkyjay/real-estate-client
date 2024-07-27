export interface Item {
  id: number
  title: string
  img?: string
  bedroom?: number
  bathroom: number
  price: number
  address: string
  latitude: number
  longitude: number
}

export interface AuthUser {
  id?: number
  username?: string
  email: string
  avatar: string
}

export interface IProperty {
  id: number
  userid: number
  title: string
  bedroom: number
  bathroom: number
  price: number
  images: string[]
  address: string
  city: string
  listing_type: string
  category: string
  latitude: number
  longitude: number
  utilities: string
  description: string
  pet: string
  income: string
  size: number
  school: number
  bus: number
  restaurant: number
  username: string
  avatar: string
  isSaved: boolean
}

export interface IUserProperties {
  userProperties: IProperty[]
  savedProperties: IProperty[]
}

interface IMessage {
  id: number
  message: string
  chatid: number
  senderid: number
  created_at: string
}

export interface IChat {
  id: number
  creatorid: number
  receiverid: number
  seenby: number[]
  lastmessage: string
  created_at: string
  username: string
  avatar: string
  partnerid: number
  messages: IMessage[]
}