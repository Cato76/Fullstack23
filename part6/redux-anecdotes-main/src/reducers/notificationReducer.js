import { createSlice } from '@reduxjs/toolkit'

  const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
      setNotification(state, action) {
        return action.payload
      }
    },
  })


  export const setMessage = (message, timer) => {

    if(!timer){
      timer=5000
    }

    return async dispatch => {
  
      dispatch(setNotification(`'${message}' was created!`))
  
      setTimeout(() => {
        dispatch(setNotification(null))
      }, timer);
    }
  }


  export const { setNotification } = notificationSlice.actions
  export default notificationSlice.reducer