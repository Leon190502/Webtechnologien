import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas' }
	])
	const [newName, setNewName] = useState('')

	const handleNewNameChange = e => setNewName(e.target.value)

	const handleAddNewPerson = e => {
		e.preventDefault()

		if (persons.find(person => person.name === newName)) {
			alert(`${newName} is already in the Phonebook`)
			setNewName('')

		} else {
			const newPerson = { name: newName }
			setPersons(persons.concat(newPerson))
			setNewName('')
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
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map(person => <p key={person.name}>{person.name}</p>)}
		</div>
	)
}

export default App