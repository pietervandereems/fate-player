import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import user from '../Reducers/user.reducer'
import notification from '../Reducers/notification.reducer'
import characters from '../Reducers/characters.reducer'
import games from '../Reducers/games.reducer'

const reducer = combineReducers({
  notification,
  user,
  characters,
  games
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
