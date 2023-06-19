import { useDispatch } from 'react-redux'
import { SET_FILTER } from '../reducers/filterReducer'

const Filter = (props) => {

  const dispatch = useDispatch()
  
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={(event)=>dispatch(SET_FILTER(event.target.value))} />
      </div>
    )
  }
  
export default Filter