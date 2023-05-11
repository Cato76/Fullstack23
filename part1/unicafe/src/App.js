import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const increaseGood = () => {
    console.log('new good value', good + 1)
    setGood(good + 1)
    setAll(all + 1)
  }

  const increaseNeutral = () => {
    console.log('new neutral value', neutral + 1)
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const increaseBad = () => {
    console.log('new bad value', bad + 1)
    setBad(bad + 1)
    setAll(all + 1)
  }

  if (all === 0) {
    return (
      <>
        <h1>give feedback</h1>

        <Button handleClick={() => increaseGood()} text="good" />
        <Button handleClick={() => increaseNeutral()} text="neutral" />
        <Button handleClick={() => increaseBad()} text="bad" />

        <h1>statistics</h1>
        <p>no feedback given</p>

      </>
    )
  }

  return (
    <div>

      <h1>give feedback</h1>

      <Button handleClick={() => increaseGood()} text="good" />
      <Button handleClick={() => increaseNeutral()} text="neutral" />
      <Button handleClick={() => increaseBad()} text="bad" />

      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine value={good} text={"good"} />
          <StatisticLine value={neutral} text={"neutral"} />
          <StatisticLine value={bad} text={"bad"} />

          <StatisticLine value={all} text={"all"} />
          <StatisticLine value={((good / all) * 100) + "%"} text={"positive"} />
          <StatisticLine value={(good - bad) / all} text={"average"} />
        </tbody>
      </table>


    </div>
  )
}

const StatisticLine = (props) => <tr><td>{props.text}:</td><td>{props.value}</td></tr>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


export default App