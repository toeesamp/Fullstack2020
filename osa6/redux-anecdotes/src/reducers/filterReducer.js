const filterReducer = (state = '', action) => {
    console.log('ÄKSÖN')
    console.log(action)
    switch (action.type) {
        case 'SET_FILTER':
            console.log(action)
            return action.filter
        default:
            return state
    }
}

export const filterChange = (filter) => {
    return {
        type: 'SET_FILTER',
        filter,
    }
}

export default filterReducer