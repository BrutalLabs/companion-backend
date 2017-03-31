let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let db = require('./api/services/db')
let mongodb_uri = process.env.MONGODB_URI

app.use(bodyParser.json()); // for parsing application/json
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Define Controllers
app.use(require('./api/controllers'))

// set the port of the application via environment variables
let port = process.env.PORT || 3000;

// Connect to Mongo and Run server
db.connect(mongodb_uri, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo. Error: ', err)
    process.exit(1)
  } else {
    console.log('Connection to Mongo established at', mongodb_uri);
    app.listen(port, function() {
      console.log('Listening on port: ', port)
    })
  }
})
