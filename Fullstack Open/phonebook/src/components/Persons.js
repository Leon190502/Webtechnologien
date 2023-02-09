import React from 'react'
import Person from './Person'

const Persons = ({ persons, search }) => {
	return (
		<div>
			{persons.filter(person => person.name.toLocaleLowerCase().includes(search)).map(person => <Person person={person} />)}
		</div>
	)
}

export default Persons