import { useState } from 'react'


const Statistics = (props) => {
  return(
    <div>
      <p>Good {props.good}</p>
      <p>Neutral {props.neutral}</p>
      <p>Bad {props.bad}</p>
    </div>
   )
}


const Feedback = (props) => {
  return(
  <div>
    <button onClick={props.button1}>good</button>
   <button onClick={props.button2}>neutral</button>
   <button onClick={props.button3}>bad</button>
</div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => setGood(good + 1)
  const neutralClick = () => setNeutral(neutral + 1)
  const badClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>Feedback</h1>
      <Feedback button1={goodClick} button2={neutralClick} button3={badClick}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
