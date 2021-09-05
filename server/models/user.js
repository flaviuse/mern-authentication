const Joi = require("joi");
const bcrypt = require("bcryptjs");
const moment = require("moment");
moment().format();

const mongoose = require("mongoose");
const R = require("ramda");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  passwordResetToken: { type: String, default: "" },
  passwordResetExpires: { type: Date, default: moment().utcOffset(0) },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  expires: { type: Date, default: moment().utcOffset(0), expires: 43200 },
});

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.hashPassword = function () {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err1, salt) => {
      if (err1) {
        reject(err1);
        return;
      }
      bcrypt.hash(this.password, salt, (err2, hash) => {
        if (err2) {
          reject(err2);
          return;
        }
        this.password = hash;
        resolve(hash);
      });
    });
  });
};

userSchema.methods.hidePassword = function () {
  return R.omit(["password", "__v", "_id"], this.toObject({ virtuals: true }));
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean().required(),
  });

  return schema.validate(user);
}

function validateLoginInput(input) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(input);
}

function validateRegisterInput(input) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
  });

  return schema.validate(input);
}

function validateEmail(input) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
  });

  return schema.validate(input);
}

function validatePassword(input) {
  const schema = Joi.object({
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(input);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateRegisterInput = validateRegisterInput;
exports.validateEmail = validateEmail;
exports.validateLoginInput = validateLoginInput;
exports.validatePassword = validatePassword;
