var restify = require('restify');
var util = require('util');
var log = require('./log');
var server = restify.createServer();

server.use(restify.bodyParser());

server.get('/validate/:email', require('./routers/validate'));

server.post('/signup', require('./routers/signup'));

server.listen(process.env.NODE_PORT || 8080, () => {
  log.logger.info('Server listening', {
    port: process.env.NODE_PORT || 8080
  });
});
