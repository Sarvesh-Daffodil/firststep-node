'use strict';

const Ajv = require('ajv');

const ApiUtils = require('./ApiUtils');
const { error } = require('../constants');

/**
 * 
 * @param {*} schema 
 * @param {*} input 
 */

const validateInput = (schema, input) => {

    input = input || {};

    const ajv = new Ajv({
        allErrors: true,
    });

    const valid = ajv.validate(schema, input);

    if (!valid) {
        throw (new ApiUtils().getApiError(error.INVALID_INPUT, ajv.errorsText(ajv.errors)));
    }
    return null;
}

module.exports = validateInput;