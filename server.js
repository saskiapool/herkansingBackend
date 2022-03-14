const express = require('express')
const app = express()
const {engine} = require('express-handlebars')
const port = process.env.port || 8080
require('dotenv').config()
const connectDB = require('./config/db')
const mongoose = require('mongoose')
const user = require("./models/user")
const bcrypt = require('bcrypt')
const { deburr } = require('lodash')

connectDB();

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

//pakt je directorty name, die zet static file naar static name waardoor je standaard in stadic folder zit en kun je styles inladen
app.use(express.static(__dirname + '/static'))

//Showing login form
app.get('/', (req, res) => {
  res.render('home', {
  title: 'Login',
  gebruikersnaam: '',
  wachtwoord: ''     
  })
  })

app.post('/home', async (req, res) => {
  const gebruikersnaam = req.body.gebruikersnaam
  const wachtwoord = req.body.wachtwoord
  try {
        const verborgenWachtwoord = await bcrypt.hash(req.body.wachtwoord, 10)
        console.log('hoi')
       
        const result = await user.create({
          gebruikersnaam: gebruikersnaam,
          wachtwoord: verborgenWachtwoord
        })

       res.redirect('/about')
  } catch {
    console.log('helloooo')
      res.redirect('home')
  }
  console.log(result)
})

app.post('/about', (req, res) => {
  res.render('about', {
    person: {
      firstname: "Saskia",
      lastname: "Pool",
    }
    })
  })

app.listen(port, () => {
    console.log('Server running on localhost:8080')
})