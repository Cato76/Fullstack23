const express = require('express');
const morgan = require('morgan');
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))


morgan.token("json",  (req) =>(JSON.stringify(req.body)))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :json"))

const PORT = process.env.PORT || 3001


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


app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`)
  })

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

const generateId = () => (Math.floor(Math.random() * 1000))



app.post('/api/persons', (request, response) => {

  const body = request.body
  


  if (!body.name&& !body.number) {
    console.log("Name and/or number is missing")
    return response.status(400).end("Name and/or number is missing") 
  }

  const personObject = {
    name: body.name,
    number: body.number,
    id: generateId()
  }
  if(persons.find(p =>p.name===personObject.name)){
    console.log("Name should be unique")
    return response.status(400).end("Name should be unique") 
  }else{
    persons = persons.concat(personObject)
    response.send(personObject)
  }

})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const personObject = persons.find(personObject => personObject.id === id)

  if (personObject) {
    response.json(personObject)
  } else {
    response.status(404).end()
  }

  response.json(personObject)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(personObject => personObject.id !== id)

  response.status(204).end()
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})