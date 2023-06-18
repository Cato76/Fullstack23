import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {

    const dispatch = useDispatch()


    const add = (event) =>{
        event.preventDefault()
        dispatch(createAnecdote(event.target.new.value))
      }

return (
    <>
    <form onSubmit={add}>
        <div><input name='new'/></div>
        <button type="submit">create</button>
    </form>
    </>
)
}

export default NewAnecdote