import loginService from '../Services/login.service'
import jsonwebtoken from 'jsonwebtoken'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN': {
      const user = action.data
      window.localStorage.setItem('user', JSON.stringify({
        ...user,
        id: jsonwebtoken.decode(user.token).id
      }))
      return user
    }
    case 'LOGOUT':
      window.localStorage.setItem('user', '')
      return null
    default:
      return state
  }
}

export const logout = () => ({ type: 'LOGOUT' })

export const initialLogin = () => {
  const localUser = window.localStorage.getItem('user')
  if (!localUser) {
    return logout()
  }
  try {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      type: 'LOGIN',
      data: user
    }
  } catch (err) {
    console.error('Error setting user from localStorage', err)
    return logout()
  }
}

export const login = (username, password) => async (dispatch) => {
  try {
    const user = await loginService.login({
      username, password
    })
    dispatch({
      type: 'LOGIN',
      data: user
    })
    return user
  } catch (exception) {
    dispatch(logout())
    return { ...exception, failed: true }
  }
}

export default reducer
