import React, { useState, useEffect } from 'react';
import AuthPage from './pages/auth/AuthPage'
import MainPage from './pages/main/MainPage'
import AuthHelpers from '../src/components/auth/AuthHelpers'
import LoginBox from '../src/components/auth/login-box/LoginBox'
import { Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom'

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
   <Router>
    <Switch>
      <Route path="/login">
        <AuthPage />
      </Route>
      <Route path="/main">
        <MainPage />
      </Route>
    </Switch>
   </Router>
   </>
  )
}

export default App;
