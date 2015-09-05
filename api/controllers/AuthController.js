module.exports = {

  register: function(req, res) {
    User.register(req.body, function(err, user) {
      // Implement
    });
  },

  facebookLogin: function(req, res, next) {
    passport.authenticate('facebook', { scope: ['email', 'public_profile', 'user_friends'] })(req, res, next);
  },

  facebookCallback: function(req, res, next) {
    passport.authenticate('facebook', function(err, user, regDetails) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }

      if (!user) {
        req.session.regDetails = regDetails;
        return res.redirect('/user/register');
      }

      req.logIn(user, function(err) {
        if (err) {
          sails.log.error(err);
          return res.serverError();
        }

        res.redirect('/');
      });
    })(req, res, next);
  },

};