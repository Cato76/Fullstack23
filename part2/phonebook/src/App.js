import { useState, useEffect } from 'react'
import services from './services.js'



const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const renderSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const renderErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    let personExists = persons.find(person => person.name === newName)
    if (personExists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updateThisPerson(personExists, personObject)
      }
    } else {
      services.create(personObject)
        .then(returnedObject => {
          setPersons(persons.concat(returnedObject))
          setNewName('')
          setNewNumber('')
          renderSuccessMessage(`${returnedObject.name} was added successfully`)
        })
        .catch(()=>renderErrorMessage(`${personObject.name} addition failed`))
    }
  }

  const updateThisPerson = (oldPerson, newPerson) => {
    services.update(oldPerson.id, newPerson).then(
      returnedObject => {
        setPersons(persons.map(person => person.id !== oldPerson.id ? person : returnedObject))
        setNewName('')
        setNewNumber('')
        renderSuccessMessage(`${newPerson.name} was updated successfully`)
      }
    ).catch((error) =>
    renderErrorMessage(`${newPerson.name} was already deleted from server`))
    setPersons(persons.filter(n => n.id !== oldPerson.id))

  }

  const deleteThisPerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      let id = person.id
      services
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          renderSuccessMessage(`${person.name} was successfully deleted`)
        }).catch(() =>renderErrorMessage(`${person.name}'s deletion failed`))
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

  useEffect(() => {
    services
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const ErrorNotifcation = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const SuccessNotication = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="success">
        {message}
      </div>
    )
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ErrorNotifcation message={errorMessage} />
      <SuccessNotication message={successMessage} />
      <FilterForm handleFilterChange={handleFilterChange} filter={filter} />
      <h2>add a number</h2>
      <SubmitForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter} deletePerson={deleteThisPerson}></Numbers> 
      
    </div>

  )
  }


const Person = ({ person, deletePerson }) => {
  return (
     <li className="person">{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></li> 
  )
}


const FilterForm = (props) => {

  const addFilter = (event) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={addFilter}>
      <div className="filter">filter by name: <input value={props.filter} onChange={props.handleFilterChange} /></div>
    </form>
  )
}

const SubmitForm = (props) => {

  return (
    <form onSubmit={props.addPerson}>
      <div className="submit">name: <input value={props.newName} onChange={props.handleNameChange} />
      number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      <button type="submit">save</button></div>
    </form>
  )
}


const Numbers = (props) => {
  let persons = props.persons
  let filter = props.filter

  return (

    persons.filter((persons) => (persons.name).includes(filter)).map(person =>
      <Person key={person.name} person={person} deletePerson={props.deletePerson} />
    )
  )
}

export default App