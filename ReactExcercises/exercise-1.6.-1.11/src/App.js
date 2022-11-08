import { useState } from 'react'


const Statistics = (props) => {
  let statVar = ""
  if(props.sum < 1){
     statVar = <div><p>Please add Feedback</p></div>
  }else{
     statVar = <div>
    <p>Good {props.good}</p>
    <p>Neutral {props.neutral}</p>
    <p>Bad {props.bad}</p>
    <p>Sum {props.sum}</p>
    <p>Positive {props.posPer}%</p>
    <p>Average {props.aver}</p>
  </div>
  }
  return(
    statVar
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
  const sum = good + neutral + bad
  const [average, setAverage] = useState(0)
  const aver = average/sum
  const posPer = good/sum*100

  const goodClick = () => {
    setGood(good + 1)
    setAverage(average + 1)
  }
  const neutralClick = () => {
    setNeutral(neutral + 1)
    setAverage(average + 0)
  }
  const badClick = () => {
    setBad(bad + 1)
    setAverage(average - 1)
  }

  return (
    <div>
      <h1>Feedback</h1>
      <Feedback button1={goodClick} button2={neutralClick} button3={badClick}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} sum={sum} posPer={posPer} aver={aver}/>
    </div>
  )
}

export default App
