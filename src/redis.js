var util = require('util');
var Q = require('q');
var redis = require('redis');
var log = require('./log');

var client = redis.createClient({
  host: process.env.REDIS_HOST
});

// Used with util.format to create redis keys.
var hashKeyTemplate = 'signup-hashes:%s';

module.exports = {};

client.on('error', (err) => {
  log.logger.error(err);
});

module.exports.addHash = (hash) => {
  return Q.ninvoke(client, 'set', util.format(hashKeyTemplate, hash), '1');
};

module.exports.hashExists = (hash) => {
  return Q.ninvoke(client, 'exists', util.format(hashKeyTemplate, hash))
  .then((exists) => {
    return Q((exists === 1) ? true : false);
  });
};
