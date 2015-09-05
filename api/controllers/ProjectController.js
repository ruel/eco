module.exports = {

  getAdd: function(req, res) {
    res.view('projectAdd');
  },

  postAdd: function(req, res) {
    Project.create(req.body, function(err, project) {
      if (err) {
        if (Utils.isValidationError(err)) {
          res.view('projectAdd', {
            error: {
              message: 'Please complete the fields'
            }
          });
        }

        sails.log.error(err);
        return res.serverError();
      }

      res.redirect('/projects/' + project.id);
    });
  },

  browse: function(req, res) {
    var query = {};
    var keyword = req.query.keyword;

    if (keyword) {
      query = {
        or: [
          { title: { contains: keyword } },
          { description: { contains: keyword } },
          { content: { contains: keyword } }
        ]
      };
    }

    var sort = 'createdAt DESC';
    var pageLimit = sails.config.page.limit;
    var page = req.query.page ? req.query.page : 1;
    var pagination = { limit: pageLimit, page: page };

    Project.list(query, pagination, sort, function(err, projects, maxCount) {
      if (err) return res.serverError();

      delete req.query.page;

      var prevQuery = _.clone(req.query);
      prevQuery.page = parseInt(page) - 1;

      var nextQuery = _.clone(req.query);
      nextQuery.page = parseInt(page) + 1;

      var nav = {
        prev: page > 1,
        next: page * pageLimit < maxCount,
        prevStr: '?' + require('querystring').stringify(prevQuery),
        nextStr: '?' + require('querystring').stringify(nextQuery)
      };

      res.view('browse', {
        projects: projects,
        keyword: keyword,
        nav: nav
      });
    });
  },

};
