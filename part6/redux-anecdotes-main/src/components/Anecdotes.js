import { useDispatch, useSelector } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'
import {setMessage} from '../reducers/notificationReducer'




const AnecdotesList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdote)
    const filter = useSelector(state => state.filter)

    const likeNotification=(anecdote)=>{

        dispatch(updateVotes(anecdote.id))
        dispatch(setMessage(`'${anecdote.content}' was liked!`))
    }

    return (
       
        <>
        {
            anecdotes.filter((anecdotes)=>(anecdotes.content).includes(filter)).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => likeNotification(anecdote)}>vote</button>
                    </div>
                </div>
            )
        }
        </>)
}
export default AnecdotesList