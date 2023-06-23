const authService = require('../services/authService');

exports.login = (req, res) => {
  const {username, password} = req.body;
  
  console.log(`authController.js - line: 6 ->> {username, password}`, username, password)

  authService.login(username, password)
    .then((user) => {
      req.session.user = user;
      res.status(200).json({ success: true, user });
    })
    .catch((error) => {
      res.status(401).json({ success: false, error });
    });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.status(200).json({ success: true });
};

exports.signin = (req, res) => {
  const { username, password } = req.body;
  authService.signin(username, password)
    .then((user) => {
      req.session.user = user;
      res.status(200).json({ success: true, user });
    })
    .catch((error) => {
      res.status(400).json({ success: false, error });
    });
};
