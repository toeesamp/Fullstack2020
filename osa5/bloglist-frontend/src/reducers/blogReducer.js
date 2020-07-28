import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'LIKE': {
            // blogService.update does not return all blog fields so we can't
            // just take action.data by itself
            let likedBlog = state.find(o => o.id === action.data.id)
            likedBlog = { ...likedBlog, likes: action.data.likes }
            return state.map(blog => blog.id === likedBlog.id ? likedBlog : blog)
        }
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'INIT_BLOGS':
            return action.data
        case 'DELETE_BLOG': {
            const deletedId = action.data.id
            return state.filter(blog => blog.id !== deletedId)
        }
        default:
            return state
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const blogToLike = { ...blog, likes: blog.likes + 1 }
        const data = await blogService.update(blogToLike)
        dispatch({
            type: 'LIKE',
            data
        })
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

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        dispatch({
            type: 'DELETE_BLOG',
            data: { id }
        })
    }
}

export default blogReducer