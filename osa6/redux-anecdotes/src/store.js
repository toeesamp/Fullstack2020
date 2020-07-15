import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteReducer from './reducers/anecdoteReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
})

const store = createStore(
    reducer,
    composeWithDevTools()
)

export default store