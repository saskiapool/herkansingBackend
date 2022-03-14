const express = require('express');
const app = express()
const {engine} = require('express-handlebars')
const port = process.env.port || 8080
require('dotenv').config()
const connectDB = require('./config/db')
const mongoose = require('mongoose')
const User = require("./models/login")

connectDB();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//pakt je directorty name, die zet static file naar static name waardoor je standaard in stadic folder zit en kun je styles inladen
app.use(express.static(__dirname + '/static'));

//Showing login form
app.get('/', (req, res) => {
  res.render('home', {
  title: 'Login',
  gebruikersnaam: '',
  wachtwoord: ''     
  })
  });

app.get('/about', (req, res) => {
  res.render('about', {
    person: {
      firstname: "Saskia",
      lastname: "Pool",
    }
    });
  })

// app.post('/', (req, res) => {
//     res.send('Got a POST request')
//   })
// app.delete('/user', (req, res) => {
//     res.send('Got a DELETE request at /user')
//   })

app.listen(port, () => {
    console.log('Server running on localhost:8080')
})