import React, { useState, useEffect } from 'react';
import LandingPage from './pages/landing/LandingPage'
import AuthHelpers from '../src/components/auth-box/AuthHelpers'
import { Redirect } from 'react-router-dom'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const Auth = new AuthHelpers();

  useEffect(() => {
    if(Auth.loggedIn()) {
      setIsLoggedIn(true)
    } else {
      console.log('you were sent away...')
      return <Redirect to="www.google.com"/>
    }
  }, [isLoggedIn])

  const logout = () => {
    Auth.logout();
      setIsLoggedIn(false);
  }

  return (
   <>
    <div style={{ 
      color: 'white', 
      fontFamily: 'roboto'}} 
      onClick={logout}
    >
      { isLoggedIn ? 
        <div>You are logged in 
          <button style={{ color: 'black', marginLeft: '1em'}} onClick={Auth.logout}>Log Out</button>
        </div> : 
        <div>You are logged out 
          <button style={{ color: 'black', marginLeft: '1em'}}>Log In</button> 
        </div>
      }
    </div>
    <LandingPage />
   </>
  )
}

export default App;
