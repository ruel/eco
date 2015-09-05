var crypto = require('crypto');

module.exports = {
  MD5: function(string) {
    return crypto.createHash('md5').update(string).digest('hex');
  },

  isValidationError: function(err) {
    if (_.isPlainObject(err)) {
      var keys = Object.keys(err);
      if (keys.length) {
        var failedValidation = err[keys[0]];
        if (_.isArray(failedValidation) && failedValidation.length &&
          _.isPlainObject(failedValidation[0]) && failedValidation[0]['rule']) {
          return true;
        }
      }
    }

    if ( _.isString(err) && err.match(/duplicate key value violates unique constraint/g) ) {
      return true;
    }
   
    if ( _.isString(err) && err.match(/^Bad request/ig)) {
      return true;
    }

    return false;
  }
};
