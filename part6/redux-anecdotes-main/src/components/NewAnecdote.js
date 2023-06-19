import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const NewAnecdote = () => {

    const dispatch = useDispatch()


    const add = (event) =>{
        event.preventDefault()
        let content = event.target.new.value
        dispatch(createAnecdote(content))

        dispatch(setNotification(`'${content}' was created!`))

        setTimeout(() => {
            dispatch(setNotification(null))
        }, 5000);
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