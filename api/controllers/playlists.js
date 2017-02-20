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

router.post('/:id/addTrack', function(req, res) {
  /* request body format
    {
      "track": {
        ...
      }
    }
  */
  let { track } = req.body;
  let id = req.params.id;

  playlistsRepository.insert(id, track).then(response => {
    res.json(response);
  }).catch(err => {
    res.json(err);
  });
});

module.exports = router
