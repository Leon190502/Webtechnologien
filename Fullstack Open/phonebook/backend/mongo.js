const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://leonsas:${password}@fullstackopenphonebook.j6hbkhv.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})

const Person = mongoose.model('Person', personSchema)

mongoose.connect(url)
	.then(() => {
		console.log('databse connected!')

		if (process.argv.length === 5) {
			const newName = process.argv[3]
			const newNumber = process.argv[4]
			const newPerson = new Person({
				name: newName,
				number: newNumber
			})

			return newPerson.save()
		} else if (process.argv.length === 3) {
			Person.find({}).then(persons => {
				console.log('phonebook:')
				persons.forEach(person => {
					console.log(`${person.id} ${person.name} ${person.number}`)
				})
			})

			return Promise.resolve()
		}
	})
	.then((savedPerson) => {
		if (savedPerson) {
			console.log(`added ${savedPerson.name} ${savedPerson.number} to phonebook`)

		}
		//mongoose.connection.close()
	})
