import { defer, LoaderFunction, LoaderFunctionArgs } from 'react-router-dom'
import customAxios from './customAxios'

export const singlePageLoader = async ({ params }: LoaderFunctionArgs) => {
  const res = await customAxios('/properties/' + params.id)
  return res.data.data
}

export const getProperties = async (request: Request) => {
  const query = request.url.split('?')[1]
  const response = await customAxios('/properties?' + query)
  return response.data.data
}

export const listPageLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const propertiesPromise = getProperties(request)
  return defer({ properties: propertiesPromise })
}

export const getUserProperties = async () => {
  const response = await customAxios('/users/properties')
  return response.data.data
}

export const getChats = async () => {
  const response = await customAxios('/chats')
  console.log(response.data.data)
  return response.data.data
}

export const profilePageLoader: LoaderFunction = async () => {
  const userPropertiesPromise = getUserProperties()
  const chatPromise = getChats()
  return defer({ properties: userPropertiesPromise, chats: chatPromise })
}
