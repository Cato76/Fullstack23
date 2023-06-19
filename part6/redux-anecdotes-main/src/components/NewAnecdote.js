import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'
import {createNew} from '../services/anecdotes'


const NewAnecdote = () => {

    const dispatch = useDispatch()


    const add = async (event) =>{
        event.preventDefault()
        let content = event.target.new.value
        const NewAnecdote = await createNew(content)
        dispatch(create(NewAnecdote))

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