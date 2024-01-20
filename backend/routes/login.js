var express = require('express');
var router = express.Router();

var logincontroller = require('../controllers/login.controller')

router.post('/', logincontroller.login);
router.post('/register', logincontroller.register);


module.exports = router;
