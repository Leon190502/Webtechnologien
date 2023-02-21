require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(cors())


let persons = [
	{
		"id": 1,
		"name": "Arto Hellas",
		"number": "040-123456"
	},
	{
		"id": 2,
		"name": "Ada Lovelace",
		"number": "39-44-5323523"
	},
	{
		"id": 3,
		"name": "Dan Abramov",
		"number": "12-43-234345"
	},
	{
		"id": 4,
		"name": "Mary Poppendieck",
		"number": "39-23-6423122"
	}
]
const generatedID = () => Math.floor((Math.random() * 1000000) + 1)

//________________________________Requests___________________________
//________________________________Getter_____________________________
//Get all
app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
})

app.get('/api/persons/:id', (request, response) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => {
			console.log(error)
			response.status(400).send({ error: 'malformatted id' })
		})
})


//______________________________Delete_________________________________
//Delete single person
app.delete('/api/persons/:id', (request, response, next) => {
	console.log('deleting peron')
	Person.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

//______________________________Post_____________________________________
//Post a single person
app.post('/api/persons', (request, response) => {
	if (!request.body.name) {
		response.status(400).json({
			error: 'name  is missing',
		})
	}
	if (!request.body.number) {
		response.status(400).json({
			error: 'number  is missing',
		})
	}

	const newName = request.body.name
	const newNumber = request.body.number
	const newPerson = new Person({
		name: newName,
		number: newNumber
	})

	newPerson.save().then(persons => {
		response.json(persons)
	})
})



const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
})