import React, { useState, useEffect } from 'react';
import LandingPage from './pages/landing/LandingPage'
import AuthHelpers from '../src/components/auth/AuthHelpers'
import { Redirect } from 'react-router-dom'
import QuestionBox from './components/questionnaire-box/QuestionBox'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const Auth = new AuthHelpers();

  useEffect(() => {
    if(Auth.loggedIn()) {
      setIsLoggedIn(true)
    } else {
      console.log('you were sent away...')
      console.log()
    }
  }, [isLoggedIn])

  const logout = () => {
    Auth.logout();
      setIsLoggedIn(false);
      return <Redirect to="/login" />
  }

  return (
   <>
    { Auth.loggedIn() ? <QuestionBox /> : <LandingPage /> }
   </>
  )
}

export default App;
