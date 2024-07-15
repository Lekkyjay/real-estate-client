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
}