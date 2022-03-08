const express = require('express');
const { partialRight } = require('lodash');
const app = express()
const port = 8080
const path = require('path')

app.get('/', function(_req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.use(express.static(path.join(__dirname, 'public')));
// app.get('/', (req, res) => {
//     res.send('Hello world')
// })

// app.post('/', (req, res) => {
//     res.send('Got a POST request')
//   })

// app.put('/user', (req, res) => {
//     res.send('Got a PUT request at /user')
//   })

// app.delete('/user', (req, res) => {
//     res.send('Got a DELETE request at /user')
//   })

app.listen(port, () => {
    console.log('Server running on localhost:8080')
})