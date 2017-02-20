let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
let mongodb_uri = process.env.MONGODB_URI;
let { ObjectId } = require('mongodb');

module.exports = {
  get() {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(mongodb_uri, function (err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
          console.log('Connection established to', mongodb_uri);

          db.collection('playlists')
            .find()
            .toArray(function(err, docs) {
              if (err) reject(err);

              db.close();
              resolve(docs);
          });
        };
      });
    });
  },

  insert(id, track) {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(mongodb_uri, function(err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
          console.log('Connection established to', mongodb_uri);

          // TODO validate track contents
          if (!track) {
            reject('No valid track in request');
          } else {
            db.collection('playlists')
              .findOneAndUpdate({ _id: ObjectId(id) }, { $addToSet: { tracks: track } }, function(err, r) {
                if (err) {
                  console.log('oops -> ', err);
                  reject(err);
                }
                db.close();
                resolve('success');
              }
            );
          }
        }
      });
    });
  }
};
