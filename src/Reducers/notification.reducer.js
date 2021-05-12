const emptyNotification = { txt: '', full: '', isError: false }

const reducer = (state = emptyNotification, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export const setNotification = (notification, sec = 5) => async dispatch => {
  dispatch({
    type: 'SET_NOTIFICATION',
    data: notification
  })
  setTimeout(() => dispatch({
    type: 'SET_NOTIFICATION',
    data: emptyNotification
  }), sec * 1000)
}

export default reducer
