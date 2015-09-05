module.exports = {

  tableName: 'levels',
  schema: true,

  attributes: {

    amount: {
      type: 'integer',
      required: true
    },

    name: {
      type: 'string',
      required: true
    },

    users: {
      collection: 'user',
      via: 'level'
    }

  }

};
