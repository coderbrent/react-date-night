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
     { !authBoxType ? <div className={abStyles.container}><div className={abStyles.box}>
        <div className={abStyles.header}>
          Login
        </div>
          <label>
            username:
            <input 
              className={abStyles.userInput} 
              name="username"
              onChange={e => setUsername(e.target.value)}
            />
          </label>
          <label>
            password:
            <input 
              className={abStyles.userInput}
              name="password"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
          </label>
        <button 
          onClick={doLogin} 
          className={abStyles.loginButton}
        >
          log in
        </button>
        <div
         style={{
           margin: '.75em'
         }}>
          <small>Don't have an account yet? 
            <button style={{ 
              background: 'transparent', 
              border: 0,
            }}
              onClick={toggleBox}
            >
              Sign up here.
            </button>
          </small>
        </div>
      </div></div> : <SignUpBox /> }
    </>
  ) 
}

export default LoginBox;