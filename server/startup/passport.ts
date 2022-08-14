import passport from "passport";
import { UserDocument, User } from "@models/user.model";
import Local from "passport-local";
import { Error } from "mongoose";

export function initPassportJS() {
  passport.use(
    new Local.Strategy((username, password, done) => {
      User.findOne({ username }, (err: Error, user: UserDocument) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(undefined, false, { message: `Username ${username} not found` });
        }
        if (!user.comparePassword(password)) {
          return done(undefined, false, { message: "Incorrect username or password" });
        }
        return done(undefined, user);
      });
    })
  );
  passport.serializeUser((user, done) => done(undefined, user));

  passport.deserializeUser((id, done) =>
    User.findById(id, (err: Error, user: UserDocument) => done(err, user))
  );
}
