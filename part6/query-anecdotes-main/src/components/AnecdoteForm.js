import { useMutation, useQueryClient } from 'react-query'
import { createAnecdotes } from '../requests'
import { useNotificationDispatch } from '../notificationContext'


const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

const newAnecdoteMutation = useMutation(createAnecdotes, {
  onSuccess: (newAnec) => {
    const Anecdotes = queryClient.getQueryData('Anecdotes')
    queryClient.setQueryData('Anecdotes', Anecdotes.concat(newAnec))
  },
  onError:(error) =>{
    notificationWithTimer(error.request.response)
  }
})

const addAnecdote = async (event) => {
  event.preventDefault()
  const content = event.target.anecdote.value
  event.target.anecdote.value = ''
  newAnecdoteMutation.mutate({ content })
  notificationWithTimer(`"${content}" was added`)
}

const notificationWithTimer =(message, timer) => {

  if(!timer){
    timer=5000
  }

  dispatch({type:'setNotification', payload:message})

  setTimeout(() => {
    dispatch({type:'setNotification', payload:null})
  }, timer)

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
