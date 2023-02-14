import React from 'react'
import Person from './Person'

const Persons = ({ persons, search, handleRemovePerson }) => {
	return (
		<div>
			{persons.filter(
				person => person.name.toLocaleLowerCase().includes(search)
			).map(
				person => <Person key={person.id} person={person} handleRemovePerson={handleRemovePerson(person.id, person.name)} />
			)}
		</div>
	)
}

export default Persons