import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import customAxios from '../lib/customAxios'

export const getNotifications = createAsyncThunk<number, void, {}>('get/notifications', async(_, thunkAPI) => {
  try {
    const res = await customAxios('/users/notification')
    return res.data.data.count
  } 
  catch (error) {
    return thunkAPI.rejectWithValue('Failed to get notifications count')
  }
})

// interface IState {
//   number: number
//   fetch: () => Promise<void>
//   decrease: () => void
//   reset: () => void
// }

interface InitialSate {
  count: number
}

const initialState: InitialSate = {
  count: 0
}

export const notificationSlice: any = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    decrease (state) {
      state.count -= 1
      return state
    }
  },
  extraReducers : (builder)=> {
    builder.addCase(getNotifications.fulfilled, (state, action)=> {
      state.count = action.payload
   })
 }
})

export const { decrease } = notificationSlice.actions
export const notificationState = (state: RootState) => state.count
export default notificationSlice.reducer