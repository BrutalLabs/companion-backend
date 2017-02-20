let request = require('request');

module.exports = {
  search(query) {
    return new Promise(function(resolve, reject) {
      // TODO write query handlers for Type (required), market, limit, offset
      request.get(`https://api.spotify.com/v1/search?q=${query}&type=album,track,artist`, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(JSON.parse(body));
        } else {
          reject(error);
        }
      });
    });
  }
}
