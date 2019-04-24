"use strict";

exports.__esModule = true;
exports.ReCAPTCHA = undefined;

var _recaptchaWrapper = require("./recaptcha-wrapper");

var _recaptchaWrapper2 = _interopRequireDefault(_recaptchaWrapper);

var _recaptcha = require("./recaptcha");

var _recaptcha2 = _interopRequireDefault(_recaptcha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _recaptchaWrapper2.default;
exports.ReCAPTCHA = _recaptcha2.default;