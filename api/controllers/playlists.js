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
    res.status(500).send({error});
  });
});

router.get('/:id', function(req, res) {
  let { id } = req.params;

  playlistsRepository.getById(id).then(response => {
    let playlist = response;
    tracksRepository.getByPlaylist(id).then(response => {
      playlist.tracks = response;
      res.json(playlist);
    }).catch(error => {
      res.status(500).send({error});
    });
  }).catch(error => {
    res.status(500).send({error});
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
  }).catch(error => {
    res.status(500).send({error});
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
  }).catch(error => {
    res.status(500).send({error});
  });
});

router.delete('/:id/delete', function(req, res) {
  let { id } = req.params;
  playlistsRepository.delete(id).then(response => {
    res.json(response);
  }).catch(error => {
    res.status(500).send({error});
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
  }).catch(error => {
    res.status(500).send({error});
  });
});

module.exports = router
