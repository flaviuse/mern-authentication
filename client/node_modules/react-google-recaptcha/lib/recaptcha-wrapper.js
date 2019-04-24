"use strict";

exports.__esModule = true;

var _recaptcha = require("./recaptcha");

var _recaptcha2 = _interopRequireDefault(_recaptcha);

var _reactAsyncScript = require("react-async-script");

var _reactAsyncScript2 = _interopRequireDefault(_reactAsyncScript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOptions() {
  return typeof window !== "undefined" && window.recaptchaOptions || {};
}
function getURL() {
  var dynamicOptions = getOptions();
  var lang = dynamicOptions.lang ? "&hl=" + dynamicOptions.lang : "";
  var hostname = dynamicOptions.useRecaptchaNet ? "recaptcha.net" : "www.google.com";
  return "https://" + hostname + "/recaptcha/api.js?onload=" + callbackName + "&render=explicit" + lang;
}

var callbackName = "onloadcallback";
var globalName = "grecaptcha";
var initialOptions = getOptions();

exports.default = (0, _reactAsyncScript2.default)(getURL, {
  callbackName: callbackName,
  globalName: globalName,
  removeOnUnmount: initialOptions.removeOnUnmount || false
})(_recaptcha2.default);