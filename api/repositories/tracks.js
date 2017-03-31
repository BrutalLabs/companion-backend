let db = require('../services/db');
let { ObjectId } = require('mongodb');

module.exports = {
  get() {
    return new Promise(function(resolve, reject) {
      db.get()
        .collection('tracks')
        .find()
        .toArray(function(err, docs) {
          if (err) {
            reject(err);
            return;
          }
          resolve(docs);
        });
    });
  },

  getByPlaylist(id) {
    return new Promise(function(resolve, reject) {
      db.get()
        .collection('tracks')
        .find({ playlist_id: id })
        .toArray(function(err, docs) {
          if (err) {
            reject(err);
            return;
          }
          resolve(docs);
        });
    });
  },

  insert(track) {
    return new Promise(function(resolve, reject) {
      // TODO validate track contents
      if (!track) {
        reject('No valid track in request');
      } else {
        db.get()
          .collection('tracks')
          .insertOne(track, function(err, r) {
            if (err) {
              reject(err);
              return;
            }
            resolve('success');
          });
      }
    });
  }
};
