import { defer, LoaderFunction, LoaderFunctionArgs } from 'react-router-dom'
import customAxios from './customAxios'
// import { AxiosResponse } from 'axios'
// import { IProperty } from '../types'


export const singlePageLoader = async ({ request, params }: LoaderFunctionArgs) => {
  const res = await customAxios('/properties/' + params.id)
  return res.data.data
}
export const listPageLoader: LoaderFunction = async ({ request, params }: LoaderFunctionArgs) => {
  const query = request.url.split('?')[1]
  const postPromise = customAxios('/posts?' + query)
  return defer({
    postResponse: postPromise,
  })
}

export const profilePageLoader: LoaderFunction = async () => {
  const postPromise = customAxios('/users/profilePosts')
  const chatPromise = customAxios('/chats')
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  })
}