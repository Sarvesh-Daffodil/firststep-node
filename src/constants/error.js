/**
 * @constant {object} ERROR
 * HTTP Status Code
 * 1xx Information
 * 2xx Successful
 * 3xx Redirection
 * 4xx Client Error
 * 5xx Server Error
 */
module.exports = {
    //4xx Client Error
    INVALID_INPUT: {
        status: 400,
        code: 'INVALID_INPUT',
        detail: 'The request input is not as expected.',
        desc: 'Bad Request'
    },
    
    INVALID_TOKEN: {
        status: 401,
        code: 'INVALID_TOKEN',
        detail: 'Access denied. Current user does not has access for this resource.',
        desc: 'Auth Token Invalid'
    },
    MISSING_TOKEN: {
        status: 401,
        code: 'MISSING_TOKEN',
        detail: 'Access denied. Current user does not has access for this resource.',
        desc: 'Auth Token Missing'
    },

    INVALID_KEY: {
        status: 403,
        code: 'INVALID_KEY',
        detail: 'Your request include an invalid API key.',
        desc: 'API Key Invalid'
    },
    MISSING_KEY: {
        status: 403,
        code: 'MISSING_KEY',
        detail: 'Your request did not include an API key.',
        desc: 'API Key Missing'
    },

    //5xx Server Error
    INTERNAL_ERROR: {
        status: 500,
        code: 'INTERNAL_ERROR',
        detail: 'An unexpected internal error has occurred. Please contact Support for more information.',
        desc: 'Internal Server Error'
    },
    SOMETHING_WENT_WRONG: {
        status: 500,
        code: 'SOMETHING_WENT_WRONG',
        detail: 'Something Went Wrong.',
        desc: 'Internal Server Error'
    },

    
    EMAIL_NOT_FOUND: {
        status: 404,
        code: 'EMAIL_NOT_FOUND',
        detail: 'Email is not registered.',
        desc: 'Resource Not Found'
    },
    PASSWORD_MISMATCH: {
        status: 401,
        code: 'PASSWORD_MISMATCH',
        detail: 'Your input password did not match.',
        desc: 'Unauthorized'
    },
    ACCOUNT_INACTIVE: {
        status: 403,
        code: 'ACCOUNT_INACTIVE',
        detail: 'Your account is inactive. Please contact admin.',
        desc: 'Forbidden'
    }
}