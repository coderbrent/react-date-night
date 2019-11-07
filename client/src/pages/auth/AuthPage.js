import React, { useState, useEffect } from 'react'
import LoginBox from '../../components/auth/login-box/LoginBox'
import SignUpBox from '../../components/auth/signup-box/SignUpBox'

const AuthPage = (props) => {
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null})
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
    <>
      <LoginBox />
    </>
  )
}

export default AuthPage;