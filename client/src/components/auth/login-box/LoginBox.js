import React, { useState, useEffect } from 'react'
import abStyles from '../AuthBox.module.css'
import AuthHelpers from '../AuthHelpers'
import SignUpBox from '../signup-box/SignUpBox'
import { useHistory } from 'react-router-dom'

const LoginBox = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authBoxType, setAuthBoxType] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let history = useHistory();

  const Auth = new AuthHelpers();

  const goToMain = () => {
    history.push('/main')
  }

  const doLogin = () => {
    Auth.login(email, password)
      .then(response => {
        if(response.status === 403) {
          return alert(`Those credentials don't exist`)
        } else {
          setLoggedIn(true)
          goToMain();
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
            email:
            <input 
              className={abStyles.userInput} 
              name="email"
              onChange={e => setEmail(e.target.value)}
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