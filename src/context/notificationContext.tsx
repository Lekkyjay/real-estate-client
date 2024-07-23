import { createContext, useEffect, useReducer } from 'react'
import NotificationReducer from './notificationReducer'
import customAxios from '../lib/customAxios'

type Action1 = {
  type: 'FETCH_SUCCESS'
  payload: number
}

type Action2 = {
  type: 'FETCH_FAILURE'
}

type Action3 = {
  type: 'DECREASE'
}

export type ActionTypes = Action1 | Action2 | Action3

interface IContextType {
  count: number
  dispatch: React.Dispatch<ActionTypes>
}

export interface IState {
  count: number
}

const INITIAL_STATE: IState = {
  count: 0
}

export const NotificationContext = createContext({} as IContextType)

export const NotificationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(NotificationReducer, INITIAL_STATE)
  
  useEffect(()=>{
    const fetchCount = async () => {
      try {
        const res = await customAxios('/users/notification')
        console.log('useEfect count....:', res.data.data.count)
        dispatch({ type: 'FETCH_SUCCESS', payload: res.data.data.count })
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' })
      }
    }
    fetchCount()
  },[state.count])
  
  return (
    <NotificationContext.Provider value={{ count: state.count, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}