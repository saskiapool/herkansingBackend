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

app.use(express.urlencoded({ extended: true }))

//laat home form zien
app.get('/', (req, res) => {
  res.render('home')
  })

//laat log in pagina zien
app.get('/login', (req, res) =>{
  res.render('login')
})

//gebruik van inloggen
app.post('/login', async (req, res) => {
  const gebruikersnaam = req.body.gebruikersnaam
  const wachtwoord = req.body.wachtwoord
    try {
          const verborgenWachtwoord = await bcrypt.hash(wachtwoord, 10)
         
          const result = await user.create({
            gebruikersnaam: gebruikersnaam,
            wachtwoord: verborgenWachtwoord
          })
  
         res.redirect('/about')
    } catch {
      console.log('Niet gelukt om in te loggen, probeer het nog eens')
        res.redirect('login')
    }
  })

//laat registreer form zien
app.get('/register', (req, res) => {
  res.render('register')
    })

//gebruik van registreren
  app.post('/register', async (req, res) => {
    const gebruikersnaam = req.body.gebruikersnaam
    const wachtwoord = req.body.wachtwoord
    try {
          const verborgenWachtwoord = await bcrypt.hash(wachtwoord, 10)
         
          const result = await user.create({
            gebruikersnaam: gebruikersnaam,
            wachtwoord: verborgenWachtwoord
          })
  
         res.redirect('/about')
    } catch {
      console.log('Niet gelukt om een account aan te maken, probeer het nog eens')
        res.redirect('register')
    }
  })

//laat about pagina zien
app.get('/about', (req, res) => {
  const gebruikersnaam = req.body.gebruikersnaam
  res.render('about', {
    person: {
      gebruikersnaam: gebruikersnaam,
    }
    })
  })

//laat logout pagina zien
app.get('/logout', (req, res) =>{
  res.render('logout')
})

//Server luistert op poort 8080
app.listen(port, () => {
    console.log('Server running on localhost:8080')
})