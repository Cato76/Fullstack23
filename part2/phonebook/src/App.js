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
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }


    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }


  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterForm handleFilterChange={handleFilterChange} filter={filter}/>
      <h2>add a number</h2>
      <SubmitForm addPerson={addPerson}newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter}></Numbers>
    </div>

  )

}

const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const FilterForm =(props) =>{

  const addFilter = (event) => {
    event.preventDefault()
  }

return(
  <form onSubmit={addFilter}>
  <div>filter by name: <input value={props.filter} onChange={props.handleFilterChange} /></div>
</form>
)
} 

const SubmitForm = (props) =>{

  return(
    <form onSubmit={props.addPerson}>
    <div>name: <input value={props.newName} onChange={props.handleNameChange} /></div>
    <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
    <div><button type="submit">save</button></div>
  </form>
  )
}


const Numbers = (props) => {
  let persons = props.persons
  let filter = props.filter

  return (

    persons.filter((persons) => (persons.name).includes(filter)).map(person =>
      <Person key={person.name} person={person} />
    )
  )
}


export default App