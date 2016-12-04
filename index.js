var express = require('express')

let app = express()
let api = require('./api/timestamps.js')

app.get('/shenanigans', (req, res) => {
  console.log('get shenanigans')
  res.send('get shenanigans')
})
app.post('/shenanigans', (req, res) => {
  console.log('post shenanigans')
  res.send('post shenanigans')
})

app.post('/testredirect', (req, res) => {
  res.redirect('/shenanigans')
})

app.use('/', api)

app.listen(3000, () => console.log('listening on 3000'))

module.exports = app
