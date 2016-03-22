var crypto = require('crypto');
var Q = require('q');
var normalize = require('normalize-email');
var log = require('../log');
var mongo = require('../mongo');

module.exports = (input) => {
  var hash = crypto.createHash('sha256');
  hash.update(normalize(input));

  var digest = hash.digest('hex');

  log.debug('Processing email address', {
    email: input,
    normalized: normalize(input),
    hash: digest
  });

  return mongo.getDB()
  .then(db => {
    var collection = db.collection('signups');

    return Q.ninvoke(collection, 'count', {digest: digest}, {limit: 1});
  })
  .then(count => {
    if (count === 0) {
      return Q();
    }

    log.warn('%s signup conflict found.', count);
    return Q.reject({
      handler: 'unique-normalized-hash',
      error: {
        count: count
      }
    });
  });
};
