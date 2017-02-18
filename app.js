let express = require('express')
let app = express()

// Define controllers
let index = require('./api/controllers/index')
app.use('/', index)

// Run server
app.listen(3000, function () {
  console.log('listening on port 3000!')
})
