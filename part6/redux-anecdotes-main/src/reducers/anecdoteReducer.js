import { createSlice } from '@reduxjs/toolkit'
import {getAll} from '../services/anecdotes'
import {createNew} from '../services/anecdotes'
import {setMessage} from '../reducers/notificationReducer'
import {updateVote} from '../services/anecdotes'





const anecdoteSlice = createSlice({
  name: 'filter',
  initialState:[],
  reducers: {
    vote(state, action) {
      return state.map(anecdote => anecdote.id === action.payload ? { ...anecdote, votes: anecdote.votes+1 } : anecdote).sort((a, b) => b.votes - a.votes)
    },
    create(state, action) {
      return [...state, (action.payload) ]
    },
    setAnecdotes(state, action){
      return action.payload.sort((a, b) => b.votes - a.votes)
    }
  },
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {

  return async dispatch => {
    const NewAnecdote = await createNew(content)
    dispatch(create(NewAnecdote))

    dispatch(setMessage(`'${content}' was created!`))
  }
}

export const updateVotes = (id) => {

  return async dispatch => {
    updateVote(id).then(dispatch(vote(id)))
  }
}

export const { vote, create, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer