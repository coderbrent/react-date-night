require('dotenv').config();
const express = require('express');
const app = express();
const port = 5000 || process.env.PORT;
const axios = require('axios');
const jwt = require('jsonwebtoken');
const exjwt = require("express-jwt");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const UserProfile = require("./Models/userProfile");

const apiKey = process.env.YELP_API_KEY

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

// DB connection and other bits (yeah yeah it's mongo give me a break)
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:${process.env.MONGO}/date-night`, {
  useUnifiedTopology: true, useNewUrlParser: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, `connection error:`));

db.once("open", () => {
  console.log(`the date-night db instance is open`);
});

const jwtMW = exjwt({
  secret: `its a secret`
});

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

app.post('/login', async (req, res) => {
  try {
    const user = await UserProfile.findOne({
      username: req.body.username
    }).exec();

    if (!user) {
      return res.status(400).send("That username does not exist.");
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).send({ message: "That password is incorrect." });
    }

    let token = jwt.sign({ username: user.username }, "its a secret", {
      expiresIn: 129600
    });
    res.json({
      success: true,
      err: null,
      token
    });
    console.log(`You are now logged in as username: ${user.username}`);
  } catch (error) {
    res.status(500).send(error);
  }
})

app.post('/signup', async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
      const newUser = new UserProfile({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      });

      const result = await newUser.save();
        res.send(result);
        console.log(result)
  } 
  catch (error) {
    res.status(500).send(error);
  }
})



app.listen(port, () => console.log(`now listening on port ${port}`));