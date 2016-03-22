var restify = require('restify');
var util = require('util');
var log = require('./log');
var server = restify.createServer();

server.get('/verify/:email', require('./verify'));

server.post('/signup', (req, res, next) => {
  res.status(501);
  res.end();
});

server.listen(process.env.NODE_PORT || 8080, () => {
  log.info('Server listening', {
    port: process.env.NODE_PORT || 8080
  });
});
