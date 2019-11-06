require('dotenv').config();
const express = require('express');
const app = express();
const port = 5000 || process.env.PORT;
const axios = require('axios');

const apiKey = process.env.YELP_API_KEY
const yelpURL = ''

app.get('/yelp/restaurants/:foodType/:lat/:lng', (req, res) => {
  axios({
    url: `https://api.yelp.com/v3/businesses/search?term=${req.params.foodType}&latitude=${req.params.lat}&longitude=${req.params.lng}`,
    method: `GET`,
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  })
    .then(response => { res.send(response.data) })
})

app.listen(port, () => console.log(`now listening on port ${port}`));