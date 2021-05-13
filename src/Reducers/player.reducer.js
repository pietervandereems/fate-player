import {
  updateDB,
  dbUpdateReducer,
  initializerReducer
} from './types.reducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'DBUPDATE_PLAYER': {
      return updateDB({ state, action })
    }
    case 'INITIALIZE_PLAYER': {
      return action.data
    }
    default:
      return state
  }
}

export const dbUpdate = dbUpdateReducer('DBUPDATE_PLAYER')
export const initialize = initializerReducer({ type: 'INITIALIZE_PLAYER', docType: 'player' })

export default reducer
