const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// registration middleware
router.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');

next();
});

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/signin', authController.signin);

module.exports = router;
