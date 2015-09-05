module.exports = {

  tableName: 'projects',
  schema: true,

  attributes: {

    name: {
      type: 'string',
      maxLength: 100,
      required: true
    },

    description: {
      type: 'string',
      maxLength: 255,
      required: true
    },

    content: {
      type: 'text',
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

    image_path: {
      type: 'string',
      required: false
    },

    owner: {
      model: 'user'
    },

  }
};
