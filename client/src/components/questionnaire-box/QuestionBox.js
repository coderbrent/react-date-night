import React, { useEffect, useState } from 'react'
import qbStyles from '../questionnaire-box/QuestionBox.module.css'
import GoogleAutoComplete from '../google-autocomplete/GoogleAutoComplete';

/* What we want to do here is have what is essentially a step-by-step
questionnaire that takes use through 4 questions, stores the answers, 
and uses those answers to shape a query to the Yelp API and Eventbrite API. 
we then want to take the responses from those APIs and create 'result cards' that will
display useful information consolidated into three activities -> a place for dinner
 and either a movie, concert, or event. Still not sure how we determine WHICH of those
you'll do (maybe that will be a budget thing?) */

const QuestionBox = () => {
 const [address, setAddress] = useState({ address: null })
 const [question, setQuestion] = 
  useState([
   `Enter A Central Location For Your Date`,
   `What time would you like to start your date?`,
   `What's your budget?`
  ])
 const [position, setPosition] = useState(0)

 const nextSlide = () => {
   setPosition(position + 1);
 }
 
  return (
    <>
      <div className={qbStyles.box}>
        <div className={qbStyles.header}>
          { position === 0 ? question[0] : nextSlide }
        </div> 
          <GoogleAutoComplete />
        <button 
          className={ 
            address ? qbStyles.submitButton : qbStyles.disabledButton 
          }
          onClick={ () => nextSlide() }
          >
          Next
        </button>
      </div>

      <div className={qbStyles.box}>
        <div className={qbStyles.header}>
          When is your date?
        </div>
          <select className={qbStyles.selectBox}>
            <option value="Romantic">Romantic</option>
            <option value="Romantic">Stupid</option>
            <option value="Romantic">Spooky</option>
            <option value="Romantic">Fun</option>
          </select>
          <button className={qbStyles.submitButton}>
          Next
        </button>
      </div>

    </>
  )
}

export default QuestionBox;