const UserModel = require('../mysql-models/user');

module.exports = {
  login: (req, res) => {
      const {username, password} = req.body;
      UserModel.login([username, password])
      .then(response => res.send(response))
      .catch(err => res.send(err)) 
  },
  signup: (req, res) => {
      const {username, password} = req.body;
      UserModel.signup({username, password})
      .then(response => res.send(response))
      .catch(err => res.send(err))    
  }, 
}