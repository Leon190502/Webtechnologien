import React from 'react'

const Total = ({ parts }) => {

	return (
		<div><p>Total of {parts.reduce((a, b) => a + b.exercises, 0)} exercises</p></div>
	)
}

export default Total