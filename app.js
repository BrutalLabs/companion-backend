let request = require('request')
let express = require('express')
let app = express()

app.get('/spotify/search', function (req, res) {
  let query = req.query.q;

  request(`https://api.spotify.com/v1/search?q=${query}&type=album,track,artist`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(response.body);
    } else {
      res.send(error);
    }
  })
})

app.listen(3000, function () {
  console.log('listening on port 3000!')
})
