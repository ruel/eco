module.exports = {

  getUser: function(req, res) {
    User.findOne({ id: req.params.user }, function(err, user) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }

      if (!user) return res.notFound();

      async.auto({

        projects: function(autoCallback) {

          var projects = [];
          async.each(user.projects, function(project, eachCallback) {

            Project.list({ id: project }, { limit: 1, page: 0 }, 'createdAt DESC', function(err, tmpProjects) {
              if (err) return eachCallback(err);
              if (tmpProjects.length < 1) return eachCallback('not_found');

              projects.push(tmpProjects[0]);
              eachCallback();
            });
            
          }, function(err) {
            if (err) return autoCallback(err);
            autoCallback(null, projects);
          });

        },

        total: function(autoCallback) {
          Fund.sum(user.id, 'user', autoCallback);
        },

        level: ['total', function(autoCallback, result) {
          Level.find({ '<': { min: result.total } }, function(err, levels) {
            if (err) {
              sails.log.error(err);
              return res.serverError();
            }

            var level = _.max(levels, function(l) { return l.min });
            autoCallback(null, level);
          });
        }],

        supported: function(autoCallback) {
          
          var supported = [];
          async.each(user.funds, function(fund, eachCallback) {

            Project.list({ id: fund.project }, { limit: 1, page: 0 }, 'createdAt DESC', function(err, projects) {
              if (err) return eachCallback(err);
              if (projects.length < 1) return eachCallback('not_found');

              supported.push(projects[0]);
              eachCallback();
            });
            
          }, function(err) {
            if (err) return autoCallback(err);
            autoCallback(null, supported);
          });

        }

      }, function(err, result) {
        user.level = result.level;
        user.total = result.total;
        user.supported = result.supported;

        res.view('user', {
          user: user
        });
      });
    });
  }
};
