import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './Person'
import Filter from './Filter'
import PersonAdder from './PersonAdder'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const handleNameInputChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberInputChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleFilterInputChange = (event) => {
        console.log(event.target.value)
        setFilter(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.some(person => person['name'] === newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const personObject = { name: newName, number: newNumber }
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
        }
    }

    const personsToShow = persons.filter(person => person['name'].includes(filter))

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
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
                    <Person key={i} name={person.name} number={person.number} />
                )}

            </ul>
        </div>
    )
}

export default App