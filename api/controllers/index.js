let request = require('request')
let express = require('express')
let router = express.Router()

router.get('/spotify/search', function (req, res) {
  let query = req.query.q;

  request(`https://api.spotify.com/v1/search?q=${query}&type=album,track,artist`, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(response.body);
      return response.body;
    } else {
      res.send(error);
      return error;
    }
  });
})

module.exports = router
