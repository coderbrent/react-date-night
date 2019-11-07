import React, { useState, useEffect } from 'react'
import abStyles from '../AuthBox.module.css'
import AuthHelpers from '../AuthHelpers'
import SignUpBox from '../signup-box/SignUpBox'

const LoginBox = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authBoxType, setAuthBoxType] = useState(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const Auth = new AuthHelpers();

  const doLogin = () => {
    Auth.login(username, password)
      .then(response => {
        if(response.status === 403) {
          return alert(`Those credentials don't exist`)
        } else {
          setLoggedIn(true)
        }
      })
      .catch(err => {
        alert(err)
      })
  }

  const toggleBox = () => {
    !authBoxType ? setAuthBoxType(true) : setAuthBoxType(false);
  }
  
  return (
    <>
     { !authBoxType ? <div className={abStyles.box}>
        <div className={abStyles.header}>
          Login
        </div>
        <div className={abStyles.row}>
          <label>
            Username:
            <input 
              className={abStyles.userInput} 
              name="username"
              onChange={e => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div className={abStyles.row}>
          <label>
            Password:
            <input 
              className={abStyles.passInput}
              name="password"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button 
          onClick={doLogin} 
          className={abStyles.loginButton}
        >
          log in
        </button>
        <button 
          onClick={toggleBox} 
          className={abStyles.signupButton}
        >
          sign up
        </button>
      </div> : <SignUpBox /> }
    </>
  ) 
}

export default LoginBox;