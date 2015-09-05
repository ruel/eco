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

  },

  sum: function(project, callback) {
    Fund.find({ project: project }, function(err, funds) {
      if (err) return callback(err);

      var fundList = _.map(funds, function(f) { return f.amount });
      var total = _.reduce(fundList, function(amount, total) {
        return amount + total;
      }, 0);

      callback(null, total);
    });
  }

};
