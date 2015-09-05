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
    }

  }

};
