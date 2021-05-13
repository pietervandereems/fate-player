import {
  updateDB,
  dbUpdateReducer,
  initializerReducer
} from './types.reducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'DBUPDATEGAMES': {
      return updateDB({ state, action })
    }
    case 'INITIALIZEGAMES': {
      return action.data
    }
    default:
      return state
  }
}

export const dbUpdate = dbUpdateReducer('DBUPDATEGAMES')
export const initialize = initializerReducer({ type: 'INITIALIZEGAMES', docType: 'game' })

export default reducer
