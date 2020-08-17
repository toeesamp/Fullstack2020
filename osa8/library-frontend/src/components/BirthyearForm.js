import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const BirthyearForm = (props) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    useEffect(() => {
        if (props.authors[0]) {
            setName(props.authors[0].name)
        }
    }, [props.authors])

    const submit = async (event) => {
        event.preventDefault()

        const bornYear = Number(born)

        editAuthor({ variables: { name, born: bornYear } })

        setName('')
        setBorn('')
    }


    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <select value={name} onChange={({ target }) => setName(target.value)}>
                    {props.authors.map(author =>
                        <option key={author.id} value={author.name}>{author.name}</option>
                    )}
                </select>
                <div>
                    born
                    <input
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default BirthyearForm