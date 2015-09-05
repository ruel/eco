module.exports.routes = {
  '/': 'Home.index',

  '/auth/facebook': 'Auth.facebookLogin',
  '/auth/facebook/callback': 'Auth.facebookCallback',
};
