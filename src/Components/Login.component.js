import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../Reducers/user.reducer'
import { setNotification } from '../Reducers/notification.reducer'
import { Button, Input, Form } from './Styles'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await dispatch(login(username, password))
    if (user.failed) {
      dispatch(setNotification({ txt: 'Wrong credentials', isError: true }))
    } else {
      dispatch(setNotification({ txt: `Welkom ${user.name}` }))
    }
  }

  return (
    <>
      <h2>log in to application</h2>
      <Form onSubmit={handleLogin}>
        <label htmlFor='Username'>username</label>
        <Input type='text' value={username} name='Username' id='Username' onChange={({ target }) => setUsername(target.value)} />
        <label htmlFor='Password'>password</label>
        <Input type='password' value={password} name='Password' id='Password' onChange={({ target }) => setPassword(target.value)} />
        <Button type='submit'>login</Button>
      </Form>
    </>
  )
}

export default Login
