const anecdoteReducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'VOTE':
            const id = action.data.id
            const anecdoteToChange = state.find(o => o.id === id)
            const changedAnecdote = {
                ...anecdoteToChange,
                votes: anecdoteToChange.votes + 1
            }
            return state.map(anecdote =>
                anecdote.id !== id ? anecdote : changedAnecdote
            )
        case 'NEW_ANECDOTE':
            return [...state, action.data]
        case 'INIT_ANECDOTES':
            return action.data
        default:
            return state
    }
}

export const vote = (id) => {
    return {
        type: 'VOTE',
        data: { id }
    }
}

export const createAnecdote = ({content, id}) => {
    return {
        type: 'NEW_ANECDOTE',
        data: {
            content: content,
            id: id,
            votes: 0
        }
    }
}

export const initializeAnecdotes = (anecdotes) => {
    return {
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    }
  }

export default anecdoteReducer