import React, { useEffect } from 'react'
import abStyles from '../auth-box/AuthBox.module.css'

const AuthBox = () => {
  
  return (
    <>
    <div className={abStyles.box}>
      <div className={abStyles.header}>
        Login
      </div>
      
      <div className={abStyles.row}>
        <label>
          Username: 
          <input className={abStyles.userInput} type="text"/>
        </label>
      </div>

      <div className={abStyles.row}>
        <label>
          Password:
          <input className={abStyles.passInput} type="text"/>
        </label>
      </div>

        <button className={abStyles.loginButton}>log in</button>
        <button className={abStyles.signupButton}>sign up</button>
    </div>
    
    </>
  )
}

export default AuthBox;