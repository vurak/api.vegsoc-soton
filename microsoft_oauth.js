// const express = require('express');
// const passport = require('passport')
// const MicrosoftStrategy = require('passport-microsoft').Strategy;
// require('dotenv').config()

// console.log(process.env.MICROSOFT_CLIENT_ID)

// passport.use(new MicrosoftStrategy({
//     clientID: process.env.MICROSOFT_CLIENT_ID,
//     clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
//     callbackURL: "http://localhost:9000/auth/microsoft/redirect",
//     scope: ['user.read']
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ userId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

// module.exports = passport