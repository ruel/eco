module.exports = {

  getUser: function(req, res) {
    User.findOne({ id: req.params.user }, function(err, user) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }

      if (!user) return res.notFound();

      res.view('user', {
        user: user
      });
    });
  }

};
