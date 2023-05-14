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

  const getSelected = persons.filter((persons)=>(persons.name).includes(filter))


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    
    if(persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }else{
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

  const addFilter=(event)=>{
    event.preventDefault()
  }
    return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addFilter}>
         <div>filter by name: <input value={filter} onChange={handleFilterChange} /></div>
       </form>
      <h2>add a number</h2>
      <form onSubmit={addPerson}>
         <div>name: <input value={newName} onChange={handleNameChange} /></div>
         <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
         <div><button type="submit">save</button></div>
       </form>
      <h2>Numbers</h2>
      {getSelected.map(person=>
      <Person key={person.name} person={person} />
      )}
    </div>
  )
}

const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}



export default App