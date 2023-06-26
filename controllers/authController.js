const authService = require('../services/authService');

exports.login = (req, res) => {
  const {username, password} = req.body;
  
  authService.login(username, password)
    .then((user) => {
      req.session.user = user;
      res.status(200).json({ success: true, id: user.id });
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
  const {username, password} = req.body;
  
  authService.signin(username, password)
    .then((user) => {
      req.session.user = user;
      res.status(200).json({ success: true, id: user.id });
    })
    .catch((error) => {
      res.status(400).json({ success: false, error });
    });
};

exports.propertyCard = ( req, res ) => {
  const {id} = req.body;

  authService.propertyCard(id)
    .then(({id, propertyCard}) => {
      req.session.user = id;
      res.status(200).json({ success: true, propertyCard });
    })
    .catch((error) => {
      res.status(400).json({ success: false, error });
    });
};

exports.propertyCardEdit = ( req, res ) => {
  const {id, formData} = req.body;

  console.log(`authController.js - line: 50 ->> EDIT`, req.body)

  authService.propertyCardEdit(id, formData)
    .then(() => {
      req.session.user = id;
      res.status(200).json({ success: true });
    })
    .catch((error) => {
      res.status(400).json({ success: false, error });
    });
};
