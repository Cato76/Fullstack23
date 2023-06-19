import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'filter',
  initialState:[],
  reducers: {
    vote(state, action) {
      return state.map(anecdote => anecdote.id === action.payload ? { ...anecdote, votes: anecdote.votes+1 } : anecdote).sort((a, b) => b.votes - a.votes);
    },
    create(state, action) {
      return [...state, (action.payload) ]
    },
    setAnecdotes(state, action){
      return action.payload
    }
  },
})

export const { vote, create, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer