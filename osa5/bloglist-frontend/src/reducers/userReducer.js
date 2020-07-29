import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export const setUser = (data) => {
    return async dispatch => {
        console.log('setuser data', data)
        blogService.setToken(data.token)
        dispatch({
            type: 'LOGIN',
            data
        })

    }
}

export const login = (username, password) => {
    return async dispatch => {
        const data = await loginService.login({ username, password })
        console.log('login data', data)
        blogService.setToken(data.token)
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(data))
        dispatch({
            type: 'LOGIN',
            data
        })
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export default userReducer