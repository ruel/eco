module.exports = {

  tableName: 'funds',
  schema: true,

  attributes: {

    user: {
      model: 'user'
    },

    project: {
      model: 'project'
    },

    amount: {
      type: 'float',
      required: true
    },

  }

};
