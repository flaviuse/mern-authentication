'use strict';

var assert = require('assert');

module.exports = function joiObjectId(Joi) {
  assert(Joi && Joi.isJoi, 'you must pass Joi as an argument');

  return function objectId() {
    return Joi.string().regex(/^[0-9a-fA-F]{24}$/);
  };
};
