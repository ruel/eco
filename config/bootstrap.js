var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports.bootstrap = function(cb) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({ id: id }, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new FacebookStrategy({
    clientID: sails.config.facebook.clientID,
    clientSecret: sails.config.facebook.clientSecret,
    callbackURL: sails.config.facebook.callbackURL,
    enableProof: false
  }, function(accessToken, refreshToken, profile, done) {
    User.findOne({ username: profile.id }, function(err, user) {
      if (err) return done(err);

      var userObj = {
        first_name: profile['_json'].first_name,
        last_name: profile['_json'].last_name,
        email: profile['_json'].email,
        username: profile.id
      };

      if (!user) return done(null, false, userObj);
      done(null, user);
    });
  }));

  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) return done(err);
      if (!user || Utils.MD5(password) === user.password) return done(null, false, { message: 'Invalid username or password' });

      done(null, user, { message: 'Logged-in successfully' });
    });
  }));

  cb();
};
