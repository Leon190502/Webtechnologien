import { useState } from 'react'
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = (props) => {
	return (
		<div><h1>Statistics</h1>
			<p>Good {props.good}</p>
			<p>Neutral {props.neutral}</p>
			<p>Bad {props.bad}</p>
			<p>All {props.all}</p>
			<p>Average {props.average}</p>
			<p>Positive {props.positive} %</p>
		</div>
	)
}

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const increment = (state, setState) => () => setState(state + 1)
	const all = good + neutral + bad


	return (
		<div>
			<h1>Give Feedback</h1>
			<Button onClick={increment(good, setGood)} text={"good"} />
			<Button onClick={increment(neutral, setNeutral)} text={"neutral"} />
			<Button onClick={increment(bad, setBad)} text={"bad"} />
			<Statistics good={good} neutral={neutral} bad={bad} all={all} average={(good - bad) / all} positive={good / all * 100} />

		</div>
	)
}

export default App
