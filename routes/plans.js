var express = require('express');
var router  = express.Router();
var isAuthenticated = require("../config/middleware/isAuthenticated");
var plan_controller = require('../controllers/plan_controller');

router.post('/',plan_controller.index);
router.get('/',plan_controller.getPlans);
router.get('/:id',plan_controller.getPlansByID);


module.exports = router;