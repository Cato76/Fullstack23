import AnecdotesList from "./components/Anecdotes"
import NewAnecdote from "./components/NewAnecdote"
import Filter from "./components/Filter"
import Notification from "./components/Notification"




const App = () => {

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