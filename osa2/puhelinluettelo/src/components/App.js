import React, { useState, useEffect } from 'react'
import Person from './Person'
import Filter from './Filter'
import PersonAdder from './PersonAdder'
import personService from '../services/Persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

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
        if (persons.some(person => person['name'] === newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const personObject = { name: newName, number: newNumber }
            personService
                .create(personObject)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const deletePerson = (id) => {
        const personToBeDeleted = persons.filter(person => person.id === id)[0]
        if (!window.confirm(`Delete ${personToBeDeleted.name}?`)) {
            return
        }
        personService
            .deletePerson(id)
            .then(response => {
                setPersons(persons.filter(person => person !== personToBeDeleted))
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