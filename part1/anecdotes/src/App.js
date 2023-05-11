import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [index, setIndex] = useState(0)
  const [points, setPoints] =useState(new Array(anecdotes.length).fill(0))



  const click = () => {
    let random = (Math.floor(Math.random() * anecdotes.length))
    setIndex(random)
    setSelected(random)

  }

  const vote = () =>{
    const copy = [...points]
    copy[index] +=1
    setPoints(copy)
    console.log(points)
  }

  const indexOfMostVoted=()=>{
    let max = 0
    let index = 0

    for (var i = 0; i < points.length; i++){
      if(points[i]>max){
        max=points[i]
        index=i
      }
    }
    return index
  }
  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[index]} points</p>
      <Button handleClick={() => click()} text="next" />
      <Button handleClick={() => vote()} text="vote" />

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[indexOfMostVoted()]}</p>


    </div>
  )
}





const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

export default App