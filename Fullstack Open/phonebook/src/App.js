import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [search, setSearch] = useState('')

	const handleNewNameChange = e => setNewName(e.target.value)
	const handleNewNumberChange = e => setNewNumber(e.target.value)
	const handleSearch = e => setSearch(e.target.value)

	const handleAddNewPerson = e => {
		e.preventDefault()

		if (persons.find(person => person.name === newName)) {
			alert(`${newName} is already in the Phonebook`)
			setNewName('')
			setNewNumber('')

		} else {
			const newPerson = { name: newName, number: newNumber }
			setPersons(persons.concat(newPerson))
			setNewName('')
			setNewNumber('')
		}
	}



	return (
		<div>
			<h2>Phonebook</h2>
			<Filter search={search} handleSearch={handleSearch} />
			<PersonForm handleAddNewPerson={handleAddNewPerson} newName={newName} newNumber={newNumber} handleNewNameChange={handleNewNameChange} handleNewNumberChange={handleNewNumberChange} />
			<h2>Numbers</h2>
			<Persons persons={persons} search={search} />
		</div>
	)
}

export default App