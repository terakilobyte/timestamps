var express = require('express')

let app = express()
let api = require('./api/timestamps.js')

app.use('/', api)

app.listen(3000, () => console.log('listening on 3000'))

module.exports = app
