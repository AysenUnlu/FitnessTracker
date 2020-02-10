var express = require('express');
var router  = express.Router();
var isAuthenticated = require("../config/middleware/isAuthenticated");
var exercise_controller = require('../controllers/exercise_controller');

router.post('/',exercise_controller.index);
router.put('/:id', exercise_controller.setExerciseStatus);

module.exports = router;