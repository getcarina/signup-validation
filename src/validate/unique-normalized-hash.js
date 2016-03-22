var Q = require ('q');
var normalizeAndHash = require('../normalize-hash');
var log = require('../log');
var redis = require('../redis');

module.exports = (input) => {
  return normalizeAndHash(input)
  .then((hash) => {
    return redis.hashExists(hash);
  })
  .then((result) => {
    if (result) {
      log.logger.debug('Hash already exists', {
        email: input
      });

      return Q.reject('The provided username already exists.');
    }

    log.logger.debug('Hash does not exist', {
      email: input
    });

    return Q();
  });
};
