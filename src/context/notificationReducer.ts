import { ActionTypes, IState } from './notificationContext'

const NotificationReducer = (state: IState, action: ActionTypes): IState => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        count: action.payload
      }
    case "FETCH_FAILURE":
      return {
        count: 0
      }
    case "DECREASE":
      return {
        count: state.count - 1
      }
    default:
      return state
  }
}

export default NotificationReducer