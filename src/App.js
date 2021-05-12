import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './Components/Notfication.component'
import Login from './Components/Login.component'
import Overview from './Components/Overview.component'
import { initialLogin, logout } from './Reducers/user.reducer'
import {
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { Button, Nav } from './Components/Styles'
import { connect } from './Services/data.service'
import CharacterList from './Components/CharacterList.component'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initialLogin())
  }, [dispatch])

  useEffect(() => {
    dispatch(connect(user))
  }, [user, dispatch])

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  const padding = { padding: 5 }

  return (
    <>
      <Nav>
        <section>
          <Link style={padding} to='/'>App</Link>
          <Link style={padding} to='/Characters'>Characters</Link>
        </section>
        {user
          ? <em>{user.name} logged in <Button onClick={handleLogout}>logout</Button></em>
          : null}
      </Nav>
      <Notification />
      <h1>Fate-Player</h1>
      {user
        ? (
          <section>
            <Switch>
              <Route path='/Characters'>
                <CharacterList />
              </Route>
              <Route path='/'>
                <Overview />
              </Route>
            </Switch>
          </section>
          )
        : <Login />}

    </>
  )
}

export default App
