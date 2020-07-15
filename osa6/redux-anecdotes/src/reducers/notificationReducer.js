const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data.text
        case 'UNSET_NOTIFICATION':
            return null
        default:
            return state
    }
}

export const setNotification = (text) => {
    return {
        type: 'SET_NOTIFICATION',
        data: { text }
    }
}

export const unsetNotification = () => {
    return {
        type: 'UNSET_NOTIFICATION'
    }
}

export default notificationReducer