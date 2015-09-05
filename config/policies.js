module.exports.policies = {

  '*': true,
  
  AuthController: {
    facebookLogin: 'sessionCheck',
    getLogin: 'sessionCheck',
    postLogin: 'sessionCheck',
    getRegister: 'sessionCheck',
    postRegister: 'sessionCheck',
  },

};
