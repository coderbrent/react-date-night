import React, { useEffect, useState } from 'react'
import qbStyles from '../questionnaire-box/QuestionBox.module.css'
import GoogleAutoComplete from '../google-autocomplete/GoogleAutoComplete';

const QuestionBox = () => {
 const [address, setAddress] = useState({ address: null })
 
  return (
    <>
      <div className={qbStyles.box}>
        <div className={qbStyles.header}>
          Where will you be going?
        </div> 
        <label>
          <GoogleAutoComplete />
        </label>
        <button 
          className={ 
            address ? qbStyles.submitButton : qbStyles.disabledButton 
          }>
          Next
        </button>
      </div>
    </>
  )
}

export default QuestionBox;