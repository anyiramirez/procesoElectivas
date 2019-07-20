const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require("./keys")
const User = require("./user")

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use( new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientId,
    clientSecret: keys.google.clientSecret,
  }, (accessToken, refreshToken, profile, done) => {
    if (profile) {
      var nuser = null;
      if(profile.photos.length > 0){
        nuser = new User (profile.id, profile.displayName, profile.emails[0].value,profile.photos[0].value,Date.now());
      } else {
        nuser = new User (profile.id, profile.displayName, profile.emails[0].value,null,Date.now());
      } 
      
      return done(null, nuser);
      }
      else {
      return done(null, false);
      }
  }
)
);