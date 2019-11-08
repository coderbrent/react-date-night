import React, { useState } from 'react'
import abStyles from '../AuthBox.module.css'
import AuthHelpers from '../AuthHelpers'
import LoginBox from '../login-box/LoginBox'
import axios from 'axios'
import ReactSVG from 'react-svg'

const SignUpBox = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authBoxType, setAuthBoxType] = useState(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const Auth = new AuthHelpers();

  const doSignUp = event => {
    event.preventDefault();
  
    axios.post(`/signup`, {
      username: username,
      password: password,
      email: email
      })
      .then(res => { 
        if(res.data) {
          Auth.getToken();
          alert(`Your account was created`);
            console.log(res.data);
          } else {
        console.error('an error occurred during signup')
      }
    })
    .catch(error => {
      console.log("sign up server error: ")
      console.error(error)
    })
  }

  const toggleBox = () => {
    if(!authBoxType) { 
      setAuthBoxType(true) 
    } else { 
      setAuthBoxType(false)
    }
  }

return (
  <>
    { !authBoxType ? 
    <div className={abStyles.box}>
      <div className={abStyles.header}>
        Sign Up Here
        {/* <ReactSVG src="../../../icons/back-arrow.svg" /> */}
      </div>
        <label>
          username:
          <input 
            className={abStyles.userInput}
            required={true}
            name="username"
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <label>
          password:
          <input
            required={true}
            className={abStyles.userInput}
            name="password"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <label>
          e-mail:
          <input 
            className={abStyles.userInput}
            required={true}
            name="email"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
        </label>
      <button onClick={doSignUp} className={abStyles.signupButton}>sign up</button>
      <button style={{ color: '#444'}} onClick={toggleBox}>go back</button>
    </div>
     : <LoginBox /> }
   </>
  )
}

export default SignUpBox;