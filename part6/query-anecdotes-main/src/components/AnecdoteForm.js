import { useMutation, useQueryClient } from 'react-query'
import { createAnecdotes } from '../requests'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

const newAnecdoteMutation = useMutation(createAnecdotes, {
  onSuccess: (newAnec) => {
    const Anecdotes = queryClient.getQueryData('Anecdotes')
    queryClient.setQueryData('Anecdotes', Anecdotes.concat(newAnec))
  }
})

const addAnecdote = async (event) => {
  event.preventDefault()
  const content = event.target.anecdote.value
  event.target.anecdote.value = ''
  newAnecdoteMutation.mutate({ content })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
