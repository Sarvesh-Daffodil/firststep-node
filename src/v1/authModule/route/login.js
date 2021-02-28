'use strict';

const _ = require('lodash');
const express = require('express');
const router = express.Router();

const { ApiUtils, jwt } = require('../../../utils');
const { inputHandler } = require('../../../middlewares');
const { error, constant, success } = require('../../../constants');

const user = require('../../../data/user.json');

const loginSchema = {
    type: 'object',
    properties: {
        'email': {
            type: 'string'
        },
        'password': {
            type: 'string',
            minLength: 6
        }
    },
    required: ['email', 'password'],
    additionalProperties: false
};

/**
 * @api {post} /api/v1/auth/login
 * @apiName Get Info
 * @apiGroup Other
 */
router.post('/login', inputHandler.validateBody(loginSchema), async (req, res, next) => {
    try {

        const { email, password } = req.body;
        
        if(user[email]) {

            if (user[email].password !== password) {
                throw (new ApiUtils().getApiError(error.PASSWORD_MISMATCH));
            }
            else if (user[email].userStatus === constant.userStatus.INACTIVE) {
                throw (new ApiUtils().getApiError(error.ACCOUNT_INACTIVE));    
            }

            const payload = {
                'createdAt': Date.now(),
                'email': user[email].email,
                'userType': user[email].userType,
                'userStatus': user[email].userStatus,
            };
    
            const authToken = jwt.createAuthToken(payload, process.env.AUTH_SECRET_KEY || '59EB273A77F5BE8D36EC55E7DA454', process.env.AUTH_EXPIRES_IN || '30D');
    
            res.set('Authorization', authToken);
            
            res.locals.data = _.omit(user[email], 'password');
        }
        else {
            throw (new ApiUtils().getApiError(error.EMAIL_NOT_FOUND));
        }

        res.json(new ApiUtils().getApiSuccess(res.locals.data, success.LOGIN_SUCCESS));
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;

