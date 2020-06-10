import React, { useState, useEffect } from 'react'
import Person from './Person'
import Filter from './Filter'
import PersonAdder from './PersonAdder'
import Notification from './Notification'
import personService from '../services/Persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState('')
    const [notificationType, setNotificationType] = useState('')

    const handleNameInputChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberInputChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterInputChange = (event) => {
        setFilter(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = { name: newName, number: newNumber }
        if (persons.some(person => person['name'] === newName)) {
            if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                return
            }
            const updateId = persons.find(person => person['name'] === newName).id
            personService
                .update(updateId, personObject)
                .then(response => {
                    // replace updated person with response data and copy others
                    setPersons(persons.map(person => person.id !== updateId ? person : response.data))
                    setNotification(`${newName} has been updated`)
                    setNotificationType('info')
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                })
                .catch(error => {
                    setNotification(`Unable to update ${newName}: ${error}` )
                    setNotificationType('error')
                    setTimeout(() => {
                        setNotification(null)
                    }, 15000)
                })
        } else {
            personService
                .create(personObject)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewNumber('')
                    setNotification(`Added ${newName}`)
                    setNotificationType('info')
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                })
                .catch(error => {
                    setNotification(error.response.data.error)
                    setNotificationType('error')
                    setTimeout(() => {
                        setNotification(null)
                    }, 15000)
                })
        }
    }

    const deletePerson = (id) => {
        const personToBeDeleted = persons.find(person => person.id === id)
        if (!window.confirm(`Delete ${personToBeDeleted.name}?`)) {
            return
        }
        personService
            .deletePerson(id)
            .then(response => {
                setPersons(persons.filter(person => person !== personToBeDeleted))
                setNotification(`${personToBeDeleted.name} has been deleted`)
                setNotificationType('info')
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
            .catch(error => {
                setNotification(`Unable to delete ${newName}: ${error}` )
                setNotificationType('error')
                setTimeout(() => {
                    setNotification(null)
                }, 15000)
            })
    }

    const personsToShow = persons.filter(person => person['name'].toLowerCase().includes(filter.toLowerCase()))

    useEffect(() => {
        personService
            .getAll()
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification} type={notificationType} />
            <Filter text={'filter shown with'} value={filter} handler={handleFilterInputChange} />
            <PersonAdder header={'add a new'} submitFunction={addPerson} name={newName} nameHandler={handleNameInputChange} number={newNumber} numberHandler={handleNumberInputChange} />
            <h2>Numbers</h2>
            <ul>
                {personsToShow.map((person, i) =>
                    <Person key={i} name={person.name} number={person.number} deleteHandler={() => deletePerson(person.id)} />
                )}

            </ul>
        </div>
    )
}

export default App