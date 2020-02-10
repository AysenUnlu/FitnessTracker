var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var User = require("../models/User.js");
// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email",
    passwordField : 'password'
  },
  function(email, password, done) {
    User.findOne({ 'email' :  email }, function(err, user) {
      // if there are any errors, return the error before anything else
      if (err)
          return done(err);

      // if no user is found, return the message
      if (!user)
          return done(null, false, {
            message: "Incorrect username."
          }); // req.flash is the way to set flashdata using connect-flash

      // if the user is found but the password is wrong
      if (!user.validPassword(password))
          return done(null, false, {
            message: "Incorrect password."
          }); // create the loginMessage and save it to session as flashdata

      // all is well, return successful user
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// Exporting our configured passport
module.exports = passport;