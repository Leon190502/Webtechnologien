import { useState } from 'react'
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const increment = (state, setState) => () => setState(state + 1)



	return (
		<div>
			<h1>Give Feedback</h1>
			<Button onClick={increment(good, setGood)} text={"good"} />
			<Button onClick={increment(neutral, setNeutral)} text={"neutral"} />
			<Button onClick={increment(bad, setBad)} text={"bad"} />
			<h1>statistics</h1>
			<p>Good {good}</p>
			<p>Neutral {neutral}</p>
			<p>Bad {bad}</p>
		</div>
	)
}

export default App
