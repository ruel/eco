module.exports.routes = {
  'get /': 'Home.index',

  'get /auth/register': 'Auth.getRegister',
  'post /auth/register': 'Auth.postRegister',

  'get /auth/login': 'Auth.getLogin',
  'post /auth/login': 'Auth.postLogin',
  
  'get /auth/logout': 'Auth.logout',

  'get /auth/facebook': 'Auth.facebookLogin',
  'get /auth/facebook/callback': 'Auth.facebookCallback',

  'get /projects/add': 'Project.getAdd',
  'post /projects/add': 'Project.postAdd',

};
