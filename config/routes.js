module.exports.routes = {
  'get /': 'Home.index',

  'get /auth/register': 'Auth.getRegister',
  'post /auth/register': 'Auth.postRegister',

  'get /auth/facebook': 'Auth.facebookLogin',
  'get /auth/facebook/callback': 'Auth.facebookCallback',
};
