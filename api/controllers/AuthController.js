module.exports = {

  getRegister: function(req, res) {
    res.view('register', {
      regDetails: req.session.regDetails
    });
  },

  postRegister: function(req, res) {
    User.register(req.body, function(err, user, data) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }

      if (!user) {
        return res.view('register', {
          error: data
        });
      }

      req.logIn(user, function(err) {
        if (err) {
          sails.log.error(err);
          return res.serverError();
        }

        return res.redirect('/');
      });
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
        return res.redirect('/auth/register');
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

  getLogin: function(req, res) {
    res.view('login');
  },

  postLogin: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        sails.log.error(err);
        return res.serverError();
      }

      if (!user) {
        return res.view('login', {
          error: info
        });
      }

      req.logIn(user, function(err) {
        if (err) {
          sails.log.error(err);
          return res.serverError();
        }

        res.redirect('/');
      });
    })(req, res);
  },

  logout: function(req, res) {
    req.logout();
    req.session.destroy(function(err) {
      if (err) sails.log.error(err);
      return res.redirect('/');
    });
  },

};
