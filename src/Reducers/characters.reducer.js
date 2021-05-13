const rev = (doc) => parseInt(doc._rev.split('_')[0], 10)

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'DBUPDATE': {
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
    case 'INITIALIZE': {
      return action.data
    }
    default:
      return state
  }
}

export const dbUpdate = (doc) => dispatch => {
  dispatch({
    type: 'DBUPDATE',
    data: doc
  })
}

export const initialize = (docs) => dispatch => {
  dispatch({
    type: 'INITIALIZE',
    data: docs.filter((doc) => doc.type === 'character')
  })
}

export default reducer
