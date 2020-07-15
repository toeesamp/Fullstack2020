import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, unsetNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return(
        <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={handleClick}>vote</button>
        </div>
      </div>
    )
}


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter, anecdotes}) =>{
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })

    const handleVote = (anecdote) => {
        dispatch(vote(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`))
        setTimeout( () => {
            dispatch(unsetNotification())
        }, 5000 )
        
    } 
    
    return(
        <div>
            {anecdotes.sort((a,b) => (a.votes > b.votes) ? -1 : 1).map(anecdote =>
                <Anecdote 
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => handleVote(anecdote)}
                />
            )}
        </div>
    )
}

export default AnecdoteList