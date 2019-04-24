const winston = require('winston');
const mongoose = require('mongoose');

// Connect to DB from env variable url, create instance
module.exports = function() {
  const db = process.env.DB;
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  };
  mongoose
    .connect(db, options)
    .then(() => winston.info(`Connected to ${db}...`));
};
