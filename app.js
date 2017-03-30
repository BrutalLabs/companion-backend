let express = require('express')
let app = express()
let bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
