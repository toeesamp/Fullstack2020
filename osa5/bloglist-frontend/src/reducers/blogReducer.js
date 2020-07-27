import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
    //TODO: like
    //case 'VOTE':
    //    const id = action.data.id
    //    const anecdoteToChange = state.find(o => o.id === id)
    //    const changedAnecdote = {
    //        ...anecdoteToChange,
    //        votes: anecdoteToChange.votes + 1
    //    }
    //    return state.map(anecdote =>
    //        anecdote.id !== id ? anecdote : changedAnecdote
    //    )
    case 'NEW_BLOG':
        return [...state, action.data]
    case 'INIT_BLOGS':
        return action.data
    default:
        return state
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export default blogReducer