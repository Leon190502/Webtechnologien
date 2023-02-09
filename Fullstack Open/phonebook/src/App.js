import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas' }
	])
	const [newName, setNewName] = useState('')
	const handleNewNameChange = e => setNewName(e.target.value)
	const handleAddNewPerson = e => {
		e.preventDefault()
		const newPerson = { name: newName }

		setPersons(persons.concat(newPerson))
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleAddNewPerson}>
				<div>
					name: <input value={newName} onChange={handleNewNameChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map(person => <p>{person.name}</p>)}
		</div>
	)
}

export default App