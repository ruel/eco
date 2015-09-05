module.exports = {

  tableName: 'rewards',
  schema: true,

  attributes: {

    start_amount: {
      type: 'integer',
      required: true
    },

    details: {
      type: 'text',
      required: true
    },

    project: {
      model: 'project'
    }

  }

};
