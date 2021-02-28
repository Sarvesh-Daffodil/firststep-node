'use strict';

const cors = require('cors');
const express = require('express');

const { mountRoutes } = require('../utils');
const { authHandler, errorHandler } = require('../middlewares');

const configureAPI = async (app) => {

	app.use(cors());

	//Callback / Webhook / Public API
	app.use('/api/v1/public', mountRoutes('src/v1/publicModule'));

	app.use('/api', express.json());

	app.use('/api', authHandler.apiKeyCheck);

	//Unprotected API	
	app.use('/api/v1/auth', mountRoutes('src/v1/authModule'));

	//Protected API
	//app.use('/api/v1/user', authHandler.authorizationCheck(), mountRoutes('src/v1/userModule'));

	app.use(errorHandler);
};

module.exports = configureAPI;
