import React, { useState } from 'react'
import Person from './Person'
import Filter from './Filter'
import PersonAdder from './PersonAdder'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
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

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter text={'filter shown with'} value={filter} handler={handleFilterInputChange} />
            <PersonAdder header={'add a new'} submitFunction={addPerson} name={newName} nameHandler={handleNameInputChange} number={newNumber} numberHandler={handleNumberInputChange}/>
            <h2>Numbers</h2>
            <ul> 
                {persons.filter(person => person['name'].includes(filter)).map((person, i) =>
                    <Person key={i} name={person.name} number={person.number} />
                )}
                
            </ul>
        </div>
    )
}

export default App