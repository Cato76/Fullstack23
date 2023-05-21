const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://Fullstack:${password}@numberstation.ptpzdpb.mongodb.net/?retryWrites=true&w=majority`


mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('person', personSchema)

if (process.argv[4]) {

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then(() => {
    console.log('Object saved!')
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    console.log('Phonebook contents')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
}