module.exports = {

  tableName: 'projects',
  schema: true,

  attributes: {

    name: {
      type: 'string;,
      maxLength: 100,
      required: true
    },

    goal: {
      type: 'float',
      required: true
    },

    duration: {
      type: 'integer',
      required: true
    },

    owner: {
      model: 'user'
    },

  }
};
