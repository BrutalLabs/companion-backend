let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
let mongodb_uri = process.env.MONGODB_URI;

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
  }
};
