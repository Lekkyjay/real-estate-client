import { defer, LoaderFunction, LoaderFunctionArgs } from 'react-router-dom'
import customAxios from './customAxios'

export const singlePageLoader = async ({ params }: LoaderFunctionArgs) => {
  const res = await customAxios('/properties/' + params.id)
  return res.data.data
}

export const listPageLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const propertiesPromise = getProperties(request)
  return defer({ properties: propertiesPromise })
}

export const profilePageLoader: LoaderFunction = async () => {
  const postPromise = customAxios('/users/profilePosts')
  const chatPromise = customAxios('/chats')
  return defer({ postResponse: postPromise, chatResponse: chatPromise })
}

export const getProperties = async (request: Request) => {
  const query = request.url.split('?')[1]
  const response = await customAxios('/properties?' + query)
  return response.data.data
}