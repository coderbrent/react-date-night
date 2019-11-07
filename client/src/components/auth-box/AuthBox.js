import React, { useState, useEffect } from 'react'
import abStyles from '../auth-box/AuthBox.module.css'
import AuthHelpers from '../auth-box/AuthHelpers';

const AuthBox = () => {
  const Auth = new AuthHelpers();

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const doLogin = () => {
    Auth.login(username, password)
      .then(response => {
        if(response.status === 400) {
          return alert(`Those credentials don't exist`)
        } else {
          setLoggedIn(true)
        }
      })
      .catch(err => {
        alert(err)
      })
  }

  return (
    <>
      <div className={abStyles.box}>
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
          <button onClick={doLogin} className={abStyles.loginButton}>log in</button>
          <button className={abStyles.signupButton}>sign up</button>
      </div>
    </>
  )
}

export default AuthBox;