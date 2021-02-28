'use strict';

const boot = async (rootDir, app) => {
	try {
		
		//API Gateway
		await require('./apiSetup')(app);
		
		app.use((req, res, next) => {
			res.status(400).send('Not Found');
		});

	} catch (err) {
		console.log('===>Service Unavailable', err);
		
		app.use((req, res, next) => {
			res.status(503).send('Service Unavailable');
		});
	}
};

module.exports = boot;
