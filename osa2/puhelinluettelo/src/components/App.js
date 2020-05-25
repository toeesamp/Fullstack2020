import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleInputChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
      event.preventDefault()
      const personObject = {
          name: newName
      }
      setPersons(persons.concat(personObject))
      setNewName('')
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                    value={newName}
                    onChange={handleInputChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
            {persons.map((person, i) =>
                <Person key={i} name={person.name} />
            )}
        </ul>
      <div>debug: {newName}</div>
    </div>
  )
}

const Person = ({name}) => {
    return (
        <li>{name}</li>
    )
}

export default App