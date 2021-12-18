import passport from "passport";
import { User } from "../../models/user.model";
import Local from "passport-local";
import { Error } from "mongoose";

export function initPassportJS() {
  passport.use(
    new Local.Strategy((username, password, done) => {
      User.findOne({ username }, (err: Error, user: User) => {
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
  passport.serializeUser((user: User, done) => done(null, user.id));
  passport.deserializeUser((id, done) => User.findById(id).then((user: User) => done(null, user)));
}
