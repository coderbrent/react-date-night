import React, { useEffect, useState } from 'react'
import rbStyles from '../results-box/ResultBox.module.css'
import Spinner from 'react-spinkit'

const ResultBox = () => {
  const [data, setData] = useState({})
  const [dataToggle, setDataToggle] = useState(false)

  const foodType = "mexican"

  const toggle = () => {
    setDataToggle(true);
  }

  useEffect(() => {
    fetch(`/yelp/restaurants/${foodType}/40.3135221/-74.28575529999999`)
      .then(response => response.json())
      .then(results => setData(results))
  }, [])
  
  return (
    <>
<button onClick={()=> toggle()}></button>
    <div className={rbStyles.box}>
      { dataToggle ? data.businesses.map((el, i) => (
        <div 
          key={i}
        > { el.alias } 
        </div>
       )) : null }
    </div>
    </>
  )
}

export default ResultBox;