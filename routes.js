module.exports = function(app){

		// Our model controllers (rather than routes)
		var application = require('./routes/application');
		var users = require('./routes/users');
		var plans = require('./routes/plans');
		var exercise = require('./routes/exercise');

		var workout = require('./routes/workout');
	

		app.use('/', application);
		app.use('/users', users);
		app.use('/plans', plans);
		app.use('/plans/:id',plans);
		app.use('/exercise',exercise);
		app.use('/exercise/:id',exercise);
		app.use('/workout',workout);
	//	app.use('/trips', trips);
	//	app.use('/pricing', pricing);
		//other routes..
}