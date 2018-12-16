const cors = require("cors");

module.exports = function(app) {
  app.use(
    cors({
      origin: [
        `https://${process.env.HOST}`,
        `http://${process.env.HOST}`,
        `${process.env.HOST}`
      ],
      methods: ["GET", "POST", "PUT"],
      credentials: true // enable set cookie
    })
  );
};
