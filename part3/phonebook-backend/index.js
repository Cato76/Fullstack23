const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()


const Person = require('./person')




const app = express()


app.use(cors())
app.use(express.json())
app.use(express.static('build'))




morgan.token('json', (req) => (JSON.stringify(req.body)))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))

const PORT = process.env.PORT || 3001

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`)
  })

})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})


app.post('/api/persons', (request, response, next) => {

  const body = request.body

  if (!body.name && !body.number) {
    console.log('Name and/or number is missing')
    return response.status(400).end('Name and/or number is missing')
  }


  const personObject = new Person({
    name: body.name,
    number: body.number,

  })
  Person.findOne({ name: personObject.name }).then(person => {
    if (person !== null) {
      Person.findOneAndUpdate({ name: personObject.name }, personObject, { new: true, runValidators: true, context: 'query' }).then(result => {
        response.json(result)
      }).catch(err => next(err))
    } else {
      personObject.save().then(result => {
        response.json(result)
      }).catch(err => next(err))
    }
  })
})

app.put('/api/persons/:id', (request, response, next) => {

  const body = request.body

  if (!body.name && !body.number && !body.id) {
    console.log('Name and/or number is missing')
    return response.status(400).end('Name and/or number is missing')
  }

  const personObject = ({
    name: body.name,
    number: body.number,

  })
  console.log(personObject)

  Person.findOne(body.id).then(person => {
    console.log(person)
    if (person !== null) {
      Person.findOneAndUpdate({ name: personObject.name }, personObject, { new: true, runValidators: true, context: 'query' }).then(result => {
        response.json(result)
      }).catch(err => next(err))
    }
  })
})



app.get('/api/persons/:id', (request, response, next) => {

  Person.findById(request.params.id).then(person => {
    response.json(person)
  }).catch(err => next(err))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(() => response.status(204).end()).catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})