const passport = require("passport");
const { User } = require("../../models/user");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function() {
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Username doesn't exist" });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect Name or password" });
        }
        return done(null, user);
      });
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) =>
    User.findById(id).then(user => done(null, user))
  );
};
