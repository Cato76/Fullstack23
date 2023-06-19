import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: "",
  reducers: {
    SET_FILTER(state, action) {
      return action.payload
    }
  },
})

export const { SET_FILTER } = filterSlice.actions
export default filterSlice.reducer