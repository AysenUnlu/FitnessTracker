var express = require('express');
var router  = express.Router();
var isAuthenticated = require("../config/middleware/isAuthenticated");
var application_controller = require('../controllers/application_controller');

router.get('/',application_controller.index);

module.exports = router;