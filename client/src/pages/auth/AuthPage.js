import React, { useState, useEffect } from 'react'
import LoginBox from '../../components/auth/login-box/LoginBox'
import apStyles from '../auth/AuthPage.module.css'

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
      <div className={apStyles.container}>
        <LoginBox />
        <div className={apStyles.featureBox}>
          <div className={apStyles.featureBoxHeading}>{ 'What Do You Want To Do Tonight?' }</div>
            <div className={apStyles.featureBoxSubHeading}>Answering That Question Just Got A Lot Fucking Easier.</div>
            <ul className={apStyles.featureList}>
              <li>
                Create and save dates with your spouse/partner/kids/roller derby teammates
              </li>
              <li>
                Join millions of other motherfuckers like yourself in going outs
              </li>
              <li>
                Stop throwing your phone and lighting your cat on fire cause you can't figure out something to do
              </li>
              <li>
                I guess it saves time, too. I dunno. This is definitely the last reason you'd use it.
              </li>
            </ul>
        </div>
      </div>
    </>
  )
}

export default AuthPage;