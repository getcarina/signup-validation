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

handlers.push(require('./unique-normalized-hash'));

module.exports = (req, res, next) => {

  Q.all(doHandlers([req.params.email]))
  .then(() => {
    res.status(200);
    res.end();
  })
  .catch((err) => {
    log.warn(err);

    res.status(500);
    res.end();
  });

};
