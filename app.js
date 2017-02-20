let express = require('express')
let app = express()
let bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json

// Define controllers
app.use('/', require('./api/controllers/index'))
app.use('/playlists', require('./api/controllers/playlists'))

// set the port of our application
// process.env.PORT lets the port be set by Heroku
let port = process.env.PORT || 3000;

// Run server
app.listen(port, function () {
  console.log('listening on port: ', port)
})
