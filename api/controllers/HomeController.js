module.exports = {
  index: function(req, res) {
    Project.list(req.query, { limit: 3, page: 1 }, 'createdAt DESC', function(err, projects) {
      if (err) return res.serverError();

      res.view('index', {
        projects: projects
      });
    });
  },
};
