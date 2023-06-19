import { useDispatch } from 'react-redux'
import { createAnecdote} from '../reducers/anecdoteReducer'

const NewAnecdote = () => {

    const dispatch = useDispatch()

    const add = async (event) =>{
        event.preventDefault()
        let content = event.target.new.value
        dispatch(createAnecdote(content))
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