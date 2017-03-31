let { MongoClient } = require('mongodb')
let mongodb_uri = process.env.MONGODB_URI

let state = {
  db: null,
}

module.exports = {
  connect(mongodb_uri, done) {
    if (state.db) return done()

    MongoClient.connect(mongodb_uri, function(err, db) {
      if (err) return done(err)
      state.db = db
      done()
    })
  },

  get() {
    return state.db
  },

  close(done) {
    if (state.db) {
      state.db.close(function(err, result) {
        state.db = null
        state.mode = null
        done(err)
      })
    }
  }
}
