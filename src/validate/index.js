var Q = require('q');
var log = require('../log');

var handlers = [];
var doHandlers = (args) => {
  var promises = [];

  handlers.forEach((handler) => {
    promises.push(handler.apply(null, args));
  });

  return promises;
};

handlers.push(require('./email-regex'));
handlers.push(require('./forbid-disposable-domains'));
handlers.push(require('./unique-normalized-hash'));


module.exports = (email) => {
  log.logger.debug('Starting email validation handlers');
  return Q.all(doHandlers([email]));
};
