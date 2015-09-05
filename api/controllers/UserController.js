module.exports = {

  getUser: function(req, res) {
    User.findOne({ id: req.params.user }, function(err, user) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }

      if (!user) return res.notFound();

      Fund.sum(user.id, 'user', function(err, total) {
        if (err) {
          sails.log.error(err);
          return res.serverError();
        }

        Level.find({ '<': { min: total } }, function(err, levels) {
          if (err) {
            sails.log.error(err);
            return res.serverError();
          }

          var level = _.max(levels, function(l) { return l.min });

          user.level = level;
          user.total = total;

          res.view('user', {
            user: user
          });
        });
      });
    });
  }
};
