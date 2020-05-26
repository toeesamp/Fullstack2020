import React, { useState } from 'react'

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
            <div>
                filter shown with <input
                    value={filter}
                    onChange={handleFilterInputChange}
                />
            </div>
            <h2>add a new</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input
                        value={newName}
                        onChange={handleNameInputChange}
                    />
                </div>
                <div>
                    number: <input
                        value={newNumber}
                        onChange={handleNumberInputChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul> 
                {persons.filter(person => person['name'].includes(filter)).map((person, i) =>
                    <Person key={i} name={person.name} number={person.number} />
                )}
                
            </ul>
        </div>
    )
}

const Person = ({ name, number }) => {
    return (
        <li>{name} {number}</li>
    )
}

export default App