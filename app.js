let express = require('express')
let app = express()

// Define controllers
let index = require('./api/controllers/index')
app.use('/', index)

// set the port of our application
// process.env.PORT lets the port be set by Heroku
let port = process.env.PORT || 3000;

// Run server
app.listen(port, function () {
  console.log('listening on port: ', port)
})
