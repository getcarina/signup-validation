const Q = require('q');
const USERNAME_PATTERN = /^[a-zA-Z][a-zA-Z0-9_\-\.\@]*$/;

module.exports = (input) => {
  if (! input.match(USERNAME_PATTERN)) {
    return Q.reject('Your username is of an invalid format or uses invalid characters.');
  }

  return Q();
};
