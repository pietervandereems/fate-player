import {
  updateDB,
  dbUpdateReducer,
  initializerReducer
} from './types.reducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'DBUPDATECHARACTER': {
      return updateDB({ state, action })
    }
    case 'INITIALIZECHARACTER': {
      return action.data
    }
    default:
      return state
  }
}

export const dbUpdate = dbUpdateReducer('DBUPDATECHARACTER')
export const initialize = initializerReducer({ type: 'INITIALIZECHARACTER', docType: 'character' })

export default reducer
