module.exports = {
  
  tableName: 'users',
  schema:true,

  attributes: {

    username: {
      type: 'string',
      maxLength: 50,
      required: true
    },

    password: {
      type: 'string',
      maxLength: 32,
      required: true
    },

    first_name: {
      type: 'string',
      maxLength: 50,
      required: true
    },

    last_name: {
      type: 'string',
      maxLength: 50,
      required: true
    },

    phone: {
      type: 'string',
      maxLength: 50,
      required: true
    },

    email: {
      type: 'string',
      required: true
    },

    projects: {
      collection: 'project',
      via: 'owner'
    },

    funds: {
      collection: 'fund',
      via: 'user'
    }

  },

  register: function(data, callback) {
    if (data.password !== data.confirmPassword) {
      return callback(null, false, {
        message: 'Passwords do not match'
      });
    }

    data.password = Utils.MD5(data.password);
    delete data.confirmPassword;

    User.create(data, function(err, user) {
      if (err) {
        if (Utils.isValidationError(err)) {
          return callback(null, false, {
            message: 'Please complete all the fields'
          });
        }

        return callback(err);
      }

      return callback(null, user);
    });
  },

};
