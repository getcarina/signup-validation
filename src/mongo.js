var MongoClient = require('mongodb').MongoClient;
var Q = require('q');
var log = require('./log');

var db;

module.exports = {
  getDB: () => {
    if (db) {
      log.info('Returning existing DB connection');
      return Q(db);
    }

    return Q.Promise((resolve, reject) => {
      log.info('Creating DB connection');
      MongoClient.connect('mongodb://db:27017/signup-verification', (err, database) => {
        if (err) {
          log.error(err);
          return reject(err);
        }

        db = database;
        return resolve(db);
      });
    });

  }
};
