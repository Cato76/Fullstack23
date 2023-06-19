import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'


const AnecdotesList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdote)
    const filter = useSelector(state => state.filter)

    const likeNotification=(anecdote)=>{
        dispatch(vote(anecdote.id))

        dispatch(setNotification(`'${anecdote.content}' was liked!`))
        setTimeout(() => {
            dispatch(setNotification(null))
        }, 5000);
    }
    console.log(anecdotes)
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