module.exports = {

  tableName: 'levels',
  schema: true,

  attributes: {

    min: {
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
