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

  getById(id) {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(mongodb_uri, function (err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
          console.log('Connection established to', mongodb_uri);

          db.collection('playlists')
            .find({ _id: ObjectId(id) })
            .limit(1)
            .next(function(err, docs) {
              if (err) reject(err);

              let playlist = docs;
              db.collection('tracks')
                .find({ playlist_id: id })
                .toArray(function(err, docs) {
                  if (err) reject(err);

                  playlist.tracks = docs;
                  db.close();
                  resolve(playlist);
                });
            });
        };
      });
    });
  },

  create(playlist) {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(mongodb_uri, function(err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
          console.log('Connection established to', mongodb_uri);

          // TODO validate playlist contents
          if (!playlist) {
            reject('No valid playlist in request');
          } else {
            db.collection('playlists')
              .insertOne(playlist, function(err, r) {
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
  },

  patch(id, playlist) {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(mongodb_uri, function(err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
          console.log('Connection established to', mongodb_uri);

          // TODO validate playlist contents
          if (!playlist) {
            reject('No valid playlist in request');
          } else {
            db.collection('playlists')
              .update({_id: ObjectId(id) }, playlist, function(err, r) {
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
  },

  delete(id) {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(mongodb_uri, function(err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
          console.log('Connection established to', mongodb_uri);

          db.collection('playlists')
            .deleteOne({_id: ObjectId(id) }, function(err, r) {
              if (err) {
                console.log('oops -> ', err);
                reject(err);
              }
              db.close();
              resolve('success');
            }
          );
        }
      });
    });
  }
};
