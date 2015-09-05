var moment = require('moment');

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

    funds: {
      collection: 'fund',
      via: 'project'
    },

    rewards: {
      collection: 'reward',
      via: 'project'
    },

    category: {
      model: 'category'
    }

  },

  list: function(where, pagination, sort, callback) {
    var projects = [];

    Project.count({
      where: where
    }, function(err, count) {
      if (err) return callback(err);

      Project.find({
        where: where
      })
      .paginate(pagination)
      .sort(sort)
      .populate('owner')
      .populate('category')
      .populate('rewards')
      .exec(function(err, tmpProjects) {
        if (err) return callback(err);

        async.each(tmpProjects, function(project, eachCallback) {

          Fund.sum(project.id, function(err, total) {
            if (err) return eachCallback(err);
            project.total = total || 0;

            var start = moment(new Date());
            var end = moment((new Date()).setDate(project.createdAt.getDate() + project.duration));

            project.days_left = end.diff(start, 'days');
            project.progress = Math.round((project.total / project.goal) * 100);

            projects.push(project);
            eachCallback();
          });
          
        }, function(err) {
          if (err) return callback(err);
          return callback(null, projects, count);
        });
      });
    });
  },
};
