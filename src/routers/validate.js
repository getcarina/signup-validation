var Q = require('q');
var log = require('../log');
var validate = require('../validate');

module.exports = (req, res, next) => {
  validate(req.params.email)
  .then(() => {
    res.status(200);
    res.end();
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
