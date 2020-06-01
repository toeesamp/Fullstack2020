import React from 'react'

const Person = ({ name, number, deleteHandler}) => {
    return (
        <li>{name} {number} 
            <button onClick={deleteHandler} >delete</button>
        </li>
    )
}

export default Person