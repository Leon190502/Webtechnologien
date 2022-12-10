const express = require("express");
const bodyParser = require('body-parser')
const app = express();

app.use(express.json());

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

let i = persons.length

app.get("/info", (request, response) => {
    let date = new Date()
    let text = '<h1>Phonebook has info for ' +  persons.length + '</h1>' + '<h2>' + date + '</h2>'
    response.send(text);
  });

app.get("/api/persons", (request, response) => {
    response.json(persons);
  });

  app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((person) => person.id === id);
  
    if (person) {
      response.json(person);
    } else {
      res = 'Entry ' + id + ' does not exist'
      response.status(404).send(res).end();
    }
  });

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter((person) => person.id !== id);
  
    response.status(204).end();
});

app.post("/api/persons", (request, response) => {
    const person = request.body
  console.log(request.body)
  persons = persons.concat(person)
  response.json(person)
  });

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});