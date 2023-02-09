import { useState } from 'react'
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StaticticsLine = (props) => {
	return (
		<p>{props.text} {props.value}</p>
	)
}

const Statistics = (props) => {
	if (props.all > 0) {
		return (
			<div><h1>Statistics</h1>
				<StaticticsLine text={"Good"} value={props.good} />
				<StaticticsLine text={"Neutral"} value={props.neutral} />
				<StaticticsLine text={"Bad"} value={props.bad} />
				<StaticticsLine text={"All"} value={props.all} />
				<StaticticsLine text={"Average"} value={props.average} />
				<StaticticsLine text={"Positive"} value={props.positive} />
			</div>
		)
	} else {
		return (
			<div><p>No feedback given</p></div>
		)
	}
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
