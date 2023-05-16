import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Content from './components/Content'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import PersonService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [allPersons, setAllPersons] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [showAll, setShowAll] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    PersonService
      .getAll()
      .then(initialPersons => {
        setAllPersons(initialPersons)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = allPersons.filter(person => person.name === newName)
    if (personObject.length > 0) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...personObject[0], number: newNumber }
        PersonService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setAllPersons(allPersons.map(person => person.id !== updatedPerson.id ? person : returnedPerson))
            // setPersons(allPersons.map(person => person.id !== updatedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setErrorMessage(`Updated ${returnedPerson.name}`)
            setTimeout(() => {
              setErrorMessage(null)
            }
            , 5000)
          })
          .catch(error => {
            console.log(error)
            setAllPersons(allPersons.filter(person => person.id !== updatedPerson.id))
            setNewName('')
            setNewNumber('')
            setErrorMessage(`ERROR: Information of ${updatedPerson.name} has already been removed from server`)
            .setTimeout(() => {
              setErrorMessage(null)
            }
            , 5000)
          })          
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      PersonService
        .create(personObject)
        .then(returnedPerson => {
          setAllPersons(allPersons.concat(returnedPerson))
          // setPersons(allPersons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase())))
          setNewName('')
          setNewNumber('')
          setErrorMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }
          , 5000)
        })
        .catch(error => {
          console.log(error.response.data)
          setErrorMessage(`ERROR: ${error.response.data.error}`)
          setTimeout(() => {
            setErrorMessage(null)
          }
          , 5000)
        })
    }
  }

  const deletePerson = id => {
    console.log(id)
    const personObject = allPersons.filter(person => person.id === id)
    console.log(personObject)
    if(window.confirm(`Delete ${personObject[0].name}?`)) {
      PersonService
        .remove(id)
        .then(returnedPerson => {
          setAllPersons(allPersons.filter(person => person.id !== id))
          setErrorMessage(`Deleted ${personObject[0].name}`)
        })
      setTimeout(() => {
        setErrorMessage(null)
      }
      , 5000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleShowAll = (event) => {
    setShowAll(event.target.value)
    setPersons(allPersons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter showAll={showAll} setShowAll={handleShowAll} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Content allPersons={allPersons} personsToShow={persons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App