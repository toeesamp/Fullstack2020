import usersService from '../services/users'

const usersReducer = (state = null, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return action.data
        default:
            return state
    }
}

export const getUsers = () => {
    return async dispatch => {
        const data = await usersService.getAll()
        dispatch({
            type: 'GET_USERS',
            data
        })

    }
}

export default usersReducer