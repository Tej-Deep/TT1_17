var express = require('express');
var router = express.Router();

var logincontroller = require('../controllers/login.controller')

router.post('/', logincontroller.login);
// router.get('/protected', logincontroller.verifytoken, (req, res) => {
//   res.json({ message: 'Protected route accessed', user: req.user });
// });

module.exports = router;
