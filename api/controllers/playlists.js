let express = require('express')
let router = express.Router()
let playlistsRepository = require('../repositories/playlists.js');
let tracksRepository = require('../repositories/tracks.js');

/*
  Playlists Controller
  Base route '/playlists'
*/
router.get('/', function(req, res) {
  playlistsRepository.get().then(response => {
    res.json(response);
  }).catch(error => {
    res.json(error);
  });
});

router.get('/:id', function(req, res) {
  let { id } = req.params;

  playlistsRepository.getById(id).then(response => {
    res.json(response);
  }).catch(err => {
    res.json(err);
  });
});

router.post('/new', function(req, res) {
  /* request body format
    {
      "playlist": {
        "name": str,
        "owner": str
        ...
      }
    }
  */
  let { playlist }  = req.body;
  playlistsRepository.create(playlist).then(response => {
    res.json(response);
  }).catch(err => {
    res.json(err);
  });
});

router.patch('/:id/edit', function(req, res) {
  /* request body format
  {
    "playlist": {
      "name": str,
      "owner": str,
      ...
    }
  }
  */
  let { playlist } = req.body;
  let { id } = req.params;
  playlistsRepository.patch(id, playlist).then(response => {
    res.json(response);
  }).catch(err => {
    res.json(err);
  });
});

router.delete('/:id/delete', function(req, res) {
  let { id } = req.params;
  playlistsRepository.delete(id).then(response => {
    res.json(response);
  }).catch(err => {
    res.json(err);
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
  let { id } = req.params;
  track.playlist_id = id;

  tracksRepository.insert(track).then(response => {
    res.json(response);
  }).catch(err => {
    res.json(err);
  });
});

module.exports = router
