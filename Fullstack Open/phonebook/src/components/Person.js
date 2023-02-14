import React from 'react'

const Person = ({ person, handleRemovePerson }) => {
	return (
		<p key={person.id}>{person.name} {person.number} <button onClick={handleRemovePerson}>Delete</button></p>
	)
}

export default Person