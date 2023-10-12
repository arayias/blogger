import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "./models/user.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

function passportConfig(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      function (username, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return User.findOne({ username })
          .then((user) => {
            if (!user) {
              console.log("incorrect email or password");
              return cb(null, false, {
                message: "Incorrect email or password.",
              });
            }
            const match = bcrypt.compareSync(password, user.passwordHash);
            if (!match) {
              console.log("incorrect email or password");
              return cb(null, false, {
                message: "Incorrect email or password.",
              });
            }
            console.log("logged in successfully");
            return cb(null, user, { message: "Logged In Successfully" });
          })
          .catch((err) => cb(err));
      }
    )
  );

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      function (jwtPayload, cb) {
        //find the user in db if needed
        return User.findOneById(jwtPayload.id)
          .then((user) => {
            return cb(null, user);
          })
          .catch((err) => {
            return cb(err);
          });
      }
    )
  );
}

export { passportConfig };
