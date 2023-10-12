import jsonwebtoken from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const sessionLogout = (req, res, next) => {
  res.json(req.body);
};

const sessionLogin = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log(err);
      return res.status(400).json({
        message: info ? info.message : "Login failed",
        user: user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jsonwebtoken.sign({ user }, JWT_SECRET);

      return res.json({ user, token });
    });
  })(req, res);
};

export { sessionLogin, sessionLogout };
