import React from 'react';
import LandingPage from './pages/landing/LandingPage'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

function App() {

  const API_KEY = `RDTY2s5wHoE63oNa-ZkDcNbQoZ-m_UxR35hCAeyQCauZNIPLkK83f7IBgEF22JmNW2N8p-kKczn5IVv7EbjSGjebLqySqizfQNdFERLiKw1OHmfjpZzMoFnRkJy_XXYx`

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
