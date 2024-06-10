import React from 'react'
//import { GoogleLogout } from 'react-google-login';
import Button from 'react-bootstrap/Button'
import { googleLogout } from '@react-oauth/google'

function Logout ({ setUser, clientId }) {
  const onClick = () => {
    googleLogout()
    setUser(null)
    localStorage.setItem("login", null)
    console.log('Logout made successfully')
  }

  return (
    <div>
      <Button variant='light' onClick={onClick}>
        Logout
      </Button>
    </div>
  )
}

export default Logout
