let express = require('express')
let router = express.Router()
let playlistsRepository = require('../repositories/playlists.js');

/*
  Playlists Controller
  Base route '/playlists'
*/
router.get('/', function(req, res) {

  let playlists = playlistsRepository.get();

  playlists.then(response => {
    res.json(response);
  }).catch(error => {
    res.json(error);
  });
});

module.exports = router
