var crypto = require('crypto');
var Q = require('q');
var normalize = require('normalize-email');
var log = require('./log');

module.exports = (input) => {
  var hash = crypto.createHash('sha256');
  hash.update(normalize(input));

  var digest = hash.digest('hex');

  log.logger.debug('Normalizing and hashing email address', {
    email: input,
    normalized: normalize(input),
    hash: digest
  });

  return Q(digest);
};
