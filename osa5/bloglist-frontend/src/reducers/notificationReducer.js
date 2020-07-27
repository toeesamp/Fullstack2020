const notificationReducer = (state = null, action) => {
    switch (action.type) {
    case 'SET_NOTIFICATION':
        return action.data
    case 'UNSET_NOTIFICATION':
        return null
    default:
        return state
    }
}

let notificationTimeout

export const setNotification = (text, type, timeout) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: { text, type }
        })
        clearTimeout(notificationTimeout)
        notificationTimeout =
            setTimeout(() => {
                dispatch({
                    type: 'UNSET_NOTIFICATION'
                })
            }, timeout * 1000)
    }
}

export const unsetNotification = () => {
    return {
        type: 'UNSET_NOTIFICATION'
    }
}

export default notificationReducer