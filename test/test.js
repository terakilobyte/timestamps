import test from 'ava'
import request from 'supertest-as-promised'
import app from '../index.js'

const NATURAL_URI = 'December%2015,%202015'
const NATURAL = 'December 15, 2015'
const UNIX = 1450137600

test('it gets a response from /', async t => {
  t.plan(1)

  const res = await request(app).get('/')
  t.is(res.status, 200)
})

test('it gets unix and natural date back with valid unix input', async t => {
  t.plan(1)
  const res = await request(app).get('/' + UNIX)
  t.deepEqual(res.body, {unix: UNIX, natural: NATURAL})
})

test('it gets a unix and natural date back with valid string input', async t => {
  t.plan(1)
  const res = await request(app).get('/' + NATURAL_URI)
  t.deepEqual(res.body, {unix: UNIX, natural: NATURAL})
})

test('it returns null fields for invalid input', async t => {
  t.plan(2)
  let res = await request(app).get('/lollipoplollipopohlollylollylollylollipop')
  t.deepEqual(res.body, {unix: null, natural: null})
  res = await request(app).get('/api/Ja%2015%20234877234587')
  t.deepEqual(res.body, {unix: null, natural: null})
})

test('it returns the get request on redirect', async t => {
  t.plan(1)
  const res = await request(app).post('/testredirect')
  t.is(res.text, 'Found. Redirecting to /shenanigans')
})
