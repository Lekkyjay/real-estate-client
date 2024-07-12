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