import { rev } from '../Utils/utils'

const updateDB = ({ state = [], action }) => {
  const newVersion = action.data
  const prevVersion = state.find((doc) => doc._id === newVersion._id)
  if (prevVersion == null) {
    return [
      ...state,
      newVersion
    ]
  }
  if (rev(newVersion) > rev(prevVersion)) {
    return state.map((doc) => (doc._id === newVersion._id) ? newVersion : doc)
  }
  return state
}

const initializerReducer = ({ type = 'INITIALIZE', docType = 'character' }) =>
  (docs) =>
    (dispatch) => {
      dispatch({
        type: type,
        data: docs.filter((doc) => doc.type === docType)
      })
    }

const dbUpdateReducer = (type = 'DBUPDATECHARACTER') =>
  (doc) =>
    (dispatch) => {
      dispatch({
        type: type,
        data: doc
      })
    }

export {
  updateDB,
  initializerReducer,
  dbUpdateReducer
}
