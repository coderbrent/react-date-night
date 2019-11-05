import React from 'react'
import rbStyles from '../results-box/ResultBox.module.css'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import Spinner from 'react-spinkit'


const ResultBox = () => {
  
  const bizQuery = gql`
      {
        business(id: "garaje-san-francisco") {
          name
          id
          rating
          url
      }
   }
  `
  const { loading, error, data } = useQuery(bizQuery);

  return (
    <>
    <div className={rbStyles.box}>
      { loading ? <Spinner name='wave' color='purple' /> : data }
      { error ? console.log(error) : null }
    </div>
    </>
  )
}

export default ResultBox;