let request = require('request')
let express = require('express')
let router = express.Router()
let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
let mongodb_uri = process.env.MONGODB_URI;

router.get('/', function(req, res) {
  res.send(`Are you lost? I'm not supposed to be visible... Or am I?`)
})

router.get('/spotify/search', function(req, res) {
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

router.get('/testDb', function(req, res) {
  MongoClient.connect(mongodb_uri, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', mongodb_uri);

      let collection = db.collection('playlists')
      let example = {
        user: 'marcelo',
        tracks: {
          name: 'Dark Eternal Night',
          artist: 'Dream Theater'
        }
      };
      collection.insertOne(example, function(err, r) {
        console.log('inserting -> ', example);
        db.close();
      });
    };
  });

  res.send('ok')
});

module.exports = router
