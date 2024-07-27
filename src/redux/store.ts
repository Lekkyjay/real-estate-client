import { configureStore, Store, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import notificationReducer from '../redux/notificationSlice'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'

export const store: Store = configureStore({
  reducer: {
    count: notificationReducer
  },
  devTools: import.meta.env.MODE === 'development'
})

type AppThunkDispatch = ThunkDispatch<RootState, any, UnknownAction>
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

// export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector