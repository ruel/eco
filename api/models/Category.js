module.exports = {

  tableName: 'categories',
  schema: true,

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    slug: {
      type: 'string',
      required: true
    },

    projects: {
      collection: 'project',
      via: 'category'
    }

  }

};
