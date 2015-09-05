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
  }

};
