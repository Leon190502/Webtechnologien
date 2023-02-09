import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{
			name: 'Arto Hellas',
			number: 12342123
		}
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

	const handleNewNameChange = e => setNewName(e.target.value)
	const handleNewNumberChange = e => setNewNumber(e.target.value)

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
			<form onSubmit={handleAddNewPerson}>
				<div>
					name: <input value={newName} onChange={handleNewNameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNewNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
		</div>
	)
}

export default App