'use strict';

const express = require('express');
const router = express.Router();

const { success } = require('../../../constants');
const { ApiUtils } = require('../../../utils');
const { name, version } = require('../../../../package.json');

/**
 * @api {get} /api/v1/public
 * @apiName Get Info
 * @apiGroup Other
 */
router.get('/', async (req, res, next) => {
    try {
        res.locals.data = {
            'NAME': name,
            'VERSION': version,
            'NODE_ENV': process.env.NODE_ENV,
        };
        res.json(new ApiUtils().getApiSuccess(res.locals.data, success.OK));
    }
    catch (error) {
        return next(error);
    }
});

module.exports = router;