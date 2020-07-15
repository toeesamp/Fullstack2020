import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, unsetNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`anecdote added: '${content}'`))
        setTimeout( () => {
            dispatch(unsetNotification())
        }, 5000 )
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default NewAnecdote