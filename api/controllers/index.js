let express = require('express');
let router = express.Router();
let spotifyService = require('../services/spotify');

/*
  playlists Controller
  Base Route '/playlists'
*/
router.use('/playlists', require('./playlists'));

/*
  Index Controller
  Base route '/'
*/
router.get('/', function(req, res) {
  res.send(`Are you lost? I'm not supposed to be visible... Or am I?`);
});

router.get('/spotify/search', function(req, res) {
  let query = req.query.q;

  let search = spotifyService.search(query);

  search.then(result => {
    res.json(result);
  }).catch(error => {
    res.status(500).send({error});
  });
});

module.exports = router
