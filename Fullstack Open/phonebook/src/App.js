import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/person'
import Notification from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [search, setSearch] = useState('')
	const [successMessage, setSuccessMessage] = useState(null)

	useEffect(() => {
		personService.getAll().then(initialPersons => setPersons(initialPersons))
	}, [])

	const handleNewNameChange = e => setNewName(e.target.value)
	const handleNewNumberChange = e => setNewNumber(e.target.value)
	const handleSearch = e => setSearch(e.target.value)

	const handleAddNewPerson = e => {
		e.preventDefault()
		const newPerson = { name: newName, number: newNumber }
		const foundPerson = persons.find(person => person.name === newName)

		if (foundPerson) {
			if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new on?`)) {
				personService.update(foundPerson.id, newPerson).then(returnedPerson => {
					setPersons(persons.map(person => (person.id != foundPerson.id ? person : returnedPerson)))
				})
			}
		} else {
			personService.create(newPerson).then(newPer => setPersons(persons.concat(newPer)))
			setNewName('')
			setNewNumber('')

			setSuccessMessage(
				`Person ${newPerson.name} was created!`
			)
			setTimeout(() => {
				setSuccessMessage(null)
			}, 5000)
		}
	}

	const handleRemovePerson = (id, name) => () => {
		if (window.confirm(`Delete ${name}?`)) {
			personService.remove(id).then(() => {
				setPersons(persons.filter(person => person.name != name))
			})
		}
	}

	return (
		<div>
			<Notification message={successMessage} />
			<h2>Phonebook</h2>
			<Filter search={search} handleSearch={handleSearch} />
			<PersonForm
				handleAddNewPerson={handleAddNewPerson}
				newName={newName}
				newNumber={newNumber}
				handleNewNameChange={handleNewNameChange}
				handleNewNumberChange={handleNewNumberChange}
			/>
			<h2>Numbers</h2>
			<Persons
				persons={persons}
				search={search}
				handleRemovePerson={handleRemovePerson} />
		</div>
	)
}

export default App