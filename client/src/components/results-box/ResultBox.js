import React, { useEffect, useState } from 'react'
import rbStyles from '../results-box/ResultBox.module.css'

const ResultBox = () => {
  const [data, setData] = useState({})
  const [dataToggle, setDataToggle] = useState(false)

  const foodType = "mexican"

  const toggle = () => {
    setDataToggle(true);
  }

  useEffect(() => {
    fetch(`/yelp/restaurants/${foodType}/40.3134695/-74.2857994`)
      .then(response => response.json())
      .then(results => { 
        setData(results) 
        console.log(results)
      })
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