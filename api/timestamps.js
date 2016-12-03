const router = require('express').Router()
var moment = require('moment')

router.get('/', (req, res) => res.status(200).send('API ok'))
router.get('/*', timeStamp)

function timeStamp (req, res) {
  const dateFormat = 'MMMM D, YYYY'
  let unix, natural
  let input = decodeURI(req.url).replace('/', '')
  let test = Number.parseInt(input, 10)

  if (!isNaN(test)) {
    let date = moment.unix(test)
    unix = date.unix()
    natural = date.utc().format(dateFormat)
  } else {
    let date = moment.utc(input, dateFormat)
    if (date.isValid()) {
      natural = date.format(dateFormat)
      unix = date.unix()
    } else {
      unix = null
      natural = null
    }
  }
  res.json({unix, natural})
}

module.exports = router

