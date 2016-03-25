const Q = require('q');
const EMAIL_PATTERN = /.+?@.+?\..+?/;

module.exports = (input) => {
  if (! input.match(EMAIL_PATTERN)) {
    return Q.reject('Your username must be a valid e-mail address.');
  }

  return Q();
};
