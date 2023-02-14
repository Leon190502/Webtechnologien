import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [search, setSearch] = useState('')

	useEffect(() => {
		console.log('useEffect')
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				console.log('promise fulfilled')
				setPersons(response.data)
			})
	}, [])

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