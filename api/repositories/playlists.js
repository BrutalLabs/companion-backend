let db = require('../services/db');
let { ObjectId } = require('mongodb');

module.exports = {
  get() {
    return new Promise(function(resolve, reject) {
      db.get()
        .collection('playlists')
        .find()
        .toArray(function(err, docs) {
          if (err) {
            reject(err);
            return;
          }
          resolve(docs);
        });
    })
  },

  getById(id) {
    return new Promise(function(resolve, reject) {
      db.get()
        .collection('playlists')
        .find({ _id: ObjectId(id) })
        .limit(1)
        .next(function(err, docs) {
          if (err) {
            reject(err)
            return;
          }

          if (docs === null) {
            reject('No playlists found');
            return;
          }
          resolve(docs);
        });
    });
  },

  create(playlist) {
    return new Promise(function(resolve, reject) {
      // TODO validate playlist contents
      if (!playlist) {
        reject('No valid playlist in request');
      } else {
        db.get()
          .collection('playlists')
          .insertOne(playlist, function(err, r) {
            if (err) {
              reject(err);
              return;
            }
            resolve('success');
          });
      }
    });
  },

  patch(id, playlist) {
    return new Promise(function(resolve, reject) {
      // TODO validate playlist contents
      if (!playlist) {
        reject('No valid playlist in request');
      } else {
        db.get()
          .collection('playlists')
          .update({_id: ObjectId(id) }, playlist, function(err, r) {
            if (err) {
              reject(err);
              return;
            }
            resolve('success');
          });
      }
    });
  },

  delete(id) {
    return new Promise(function(resolve, reject) {
      db.get()
        .collection('playlists')
        .deleteOne({_id: ObjectId(id) }, function(err, r) {
          if (err) {
            reject(err);
            return;
          }
          resolve('success');
        });
    });
  }
};
