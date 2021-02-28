/**
 * @module
 */
'use strict';

const _ = require('lodash');
const { error } = require('../constants');
const { ApiUtils, jwt } = require('../utils');

/**
 * Api Key Check
 * @method
 * @param {req} req 
 * @param {res} res 
 * @param {next} next 
 */
const apiKeyCheck = (req, res, next) => {

    const apiKey = req.get('apiKey') || req.query.apiKey;

    const apiKeys = {
        web: process.env.API_KEY_WEB || '3BEA8ADD2B31B9587D46E3F7DF7B6',
        ios: process.env.API_KEY_IOS || '',
        android: process.env.API_KEY_ANDROID || ''
    }

    if (!_.isString(apiKey)) {
        return next(new ApiUtils().getApiError(error.MISSING_KEY));
    }

    const clientType = _.findKey(apiKeys, (value) => value === apiKey);

    res.locals.clientType = clientType;

    return next(_.isString(clientType) ? '' : new ApiUtils().getApiError(error.INVALID_KEY));
}

/**
 * Authorization Check
 * @method
 * @param {req} req 
 * @param {res} res 
 * @param {next} next 
 */
const authorizationCheck = () => {

    return (req, res, next) => {

        const token = req.get("Authorization") || req.query.Authorization;

        if (token) {
            jwt.verifyAuthToken(token, process.env.AUTH_SECRET_KEY)
                .then((decoded) => {
                    res.locals.user = decoded.user;
                    return next();
                })
                .catch((err) => {
                    return next(new ApiUtils().getApiError(error.INVALID_TOKEN, err.name === 'TokenExpiredError' ? 'Token is Expired': 'Auth Token Invalid'))
                });
        } else {
            return next(new ApiUtils().getApiError(error.MISSING_TOKEN));
        }
    }
};

module.exports = {
    apiKeyCheck,
    authorizationCheck
};