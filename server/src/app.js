const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/vuetrello')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// ==================
// ROUTES
// ==================
const authRoutes = require('./routes/authRoutes')

app.use(authRoutes)

// app.get('/', function (req, res) {
//   res.send('Hello there beepboop')
// })

// app.post('/register', (req, res) => {
//   console.log(req.body)
//   res.send('Received')
// })

app.listen(3000, function () {
  console.log('server start!')
})
// process.on('SIGHUP', () => {
//   process.exit(0)
// })
process.on('SIGINT', () => {
  console.log('Bye bye!')
  process.exit()
})
