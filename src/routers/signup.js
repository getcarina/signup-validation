var log = require('../log');
var validate = require('../validate');
var normalizeAndHash = require('../normalize-hash');
var redis = require('../redis');

module.exports = (req, res, next) => {
  if (! req.body.username) {
    log.sendHTTPError({
      req: req,
      res: res,
      status: 400,
      message: 'Invalid payload submitted to POST /signup'
    });

    throw 'Invalid payload submitted to POST /signup';
  }

  var emailHash;

  validate(req.body.username)
  .then(() => {
    return normalizeAndHash(req.body.username);
  })
  .then((hash) => {
    redis.addHash(hash)
    .then(() => {
      res.status(202);
      res.end();
    });
  })
  .catch((err) => {
    log.sendHTTPError({
      req: req,
      res: res,
      status: 409,
      message: err
    });
  });
};
