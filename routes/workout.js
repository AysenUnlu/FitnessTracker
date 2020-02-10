var express = require('express');
var router  = express.Router();
var isAuthenticated = require("../config/middleware/isAuthenticated");
var workout_controller = require('../controllers/workout_controller');

router.get('/',isAuthenticated,workout_controller.index);
module.exports = router;