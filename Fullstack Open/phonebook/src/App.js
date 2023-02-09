import { useState } from 'react'

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
			<div>
				search: <input value={search} onChange={handleSearch} />
			</div>
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
			{persons.filter(person => person.name.toLocaleLowerCase().includes(search)).map(person => <p key={person.id}>{person.name} {person.number}</p>)}
		</div>
	)
}

export default App