const Joi = require("joi");

// Allow Object ID validation with joi

module.exports = function() {
  Joi.objectId = require("joi-objectid")(Joi);
};
