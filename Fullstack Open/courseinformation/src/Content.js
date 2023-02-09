import React from 'react'

const Content = ({ parts }) => {
	return (
		< div >
			{parts.map(part => <Part key={part.id} part={part} />)}
		</div >
	)
}


const Part = ({ part }) => {
	return (
		<div><p>{part.name} {part.exercises}</p></div>
	)
}


export default Content