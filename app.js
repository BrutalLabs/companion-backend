let express = require('express')
let app = express()

app.get('/', function(req, res) {
  res.send('Welcome')
});
app.get('/spotify/search', function (req, res) {
  let query = req.query.q;
  res.json({result: query})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
