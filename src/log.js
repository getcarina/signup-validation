var winston = require('winston');

var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: 'debug'
    })
  ]
});

module.exports = {
  logger: logger
};

module.exports.sendHTTPError = (options) => {
  options.res.status(options.status);
  options.res.send({
    error: {
      status: 'error',
      message: options.message
    }
  });

  logger.error(options.message, {
    headers: options.req.headers,
    body: options.req.body,
    address: options.req.connection.remoteAddress
  });
};
