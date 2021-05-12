import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { txt, full, isError } = useSelector(state => state.notification)
  if (!txt) {
    return null
  }

  const defaultStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyle = {
    ...defaultStyle,
    color: 'red'
  }

  const noteStyle = {
    ...defaultStyle,
    color: 'darkgreen'
  }

  return (
    <div id='notification' style={isError ? errorStyle : noteStyle}>
      {txt}
      {full ? <p>{full}</p> : null}
    </div>
  )
}

export default Notification
