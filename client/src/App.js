import React from 'react';
import LandingPage from './pages/landing/LandingPage'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

function App() {

  const API_KEY = process.env.REACT_APP_API_KEY
  
  const client = new ApolloClient({
    uri: `https://api.yelp.com/v3/graphql`,
    fetchOptions: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/graphql',
        'Accept-Language': 'en_US',
      },
      useGETForQueries: true
    }
  })
  
  return (
   <>
   <ApolloProvider client={client}>
      <LandingPage />
    </ApolloProvider>
   </>
  )
}

export default App;
