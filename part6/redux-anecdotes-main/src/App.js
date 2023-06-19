import AnecdotesList from "./components/Anecdotes"
import NewAnecdote from "./components/NewAnecdote"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import { useEffect } from 'react'
import {getAll} from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'






const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecdotesList/>
      <h2>create new</h2>
      <NewAnecdote/>
    </div>
  )
}

export default App