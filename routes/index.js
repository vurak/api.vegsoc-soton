const express = require('express');
const router = express.Router();
const passport = require('passport')
const MicrosoftStrategy = require('passport-microsoft').Strategy;
require('dotenv').config()

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new MicrosoftStrategy({
  clientID: process.env.MICROSOFT_CLIENT_ID,
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  callbackURL: "http://localhost:9000/auth/microsoft/redirect",
  scope: ['user.read']
},
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {

      // To keep the example simple, the user's Microsoft Graph profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the Microsoft account with a user record in your database,
      // and return that user instead.
      console.log(profile.displayName)
      return done(null, profile);
    });
  }
));

router.get('/auth/test', ensureAuthenticated, (req, res) => {
  console.log("Yep all authed")
})

// Microsoft Auth
router.get('/auth/microsoft', passport.authenticate('microsoft'));

router.get('/auth/microsoft/redirect', passport.authenticate('microsoft', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/');
  });

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('http://localhost:3000/login')
}


module.exports = router;
