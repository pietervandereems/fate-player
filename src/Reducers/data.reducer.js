const reducer = (state = [], action) => {
  switch (action.type) {
    // case 'LOGIN': {
    //   const user = action.data
    //   window.localStorage.setItem('user', JSON.stringify({
    //     ...user,
    //     id: jsonwebtoken.decode(user.token).id
    //   }))
    //   return user
    // }
    // case 'LOGOUT':
    //   window.localStorage.setItem('user', '')
    //   return null
    default:
      return state
  }
}

export default reducer
