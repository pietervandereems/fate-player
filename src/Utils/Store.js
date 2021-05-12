import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import user from '../Reducers/user.reducer'
import notification from '../Reducers/notification.reducer'
import data from '../Reducers/data.reducer'

const reducer = combineReducers({
  notification,
  user,
  data
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
