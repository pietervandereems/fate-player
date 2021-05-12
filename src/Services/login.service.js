import axios from 'axios'
import { jwt } from '../Utils/config'

const login = async (credentials) => {
  const response = await axios.post(jwt.url, credentials)
  return response.data
}

const loginService = {
  login
}

export default loginService
