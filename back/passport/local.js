const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ where: {username} })
            if (!user)
              return done(null, false, { message: 'Incorrect username!' });

            const result = await bcrypt.compare(password, user.password);
            if (result) {
              return done(null, user);
            }

            return done(null, false, { message: 'Incorrect password!' });
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );
};
