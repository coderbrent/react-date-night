import React, { useState, useEffect } from 'react'
import lpStyles from '../landing/LandingPage.module.css'
import AuthBox from '../../components/auth-box/AuthBox'
import QuestionBox from '../../components/questionnaire-box/QuestionBox';
import ResultBox from '../../components/results-box/ResultBox'
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'

const LandingPage = (props) => {
  const [isloggedIn, setIsLoggedIn] = useState({isloggedIn: false})
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null})

  useEffect(() => {

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    const success = pos => {
      const crd = pos.coords;
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);

      setUserLocation({ lat: crd.latitude, lng: crd.longitude })
    }
    const error = err => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/results">
        <div className={lpStyles.container}>
          <ResultBox />
        </div>
        </Route>
        <Route path="/login">
        <div className={lpStyles.container}>
          <AuthBox />
        </div>
        </Route>
        <Route path="/questions">
        <div className={lpStyles.container}>
          <QuestionBox />
        </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default LandingPage;