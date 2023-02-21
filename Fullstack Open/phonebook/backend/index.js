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

//Get info page
app.get('/info', (request, response) => {
	const responseText = `
		<p>Phonebook has info for ${persons.length} people</p>
		<p>${new Date()}</p>`
	response.send(responseText)
})

//Get single person
app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)

	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})

//______________________________Delete_________________________________
//Delete single person
app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})

//______________________________Post_____________________________________
//Post a single person
app.post('/api/persons', (request, response) => {

	const foundPerson = persons.find(person => person.name === request.body.name)
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
	if (foundPerson) {
		response.status(400).json({
			error: 'name musst be unique',
		})
	}

	const id = generatedID()
	const person = {
		id: id,
		name: request.body.name,
		number: request.body.number
	}
	persons = persons.concat(person)
	response.json(person)
})



const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
})