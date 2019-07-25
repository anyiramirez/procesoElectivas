const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require("./keys")
const User = require("./user")
//----- add firebase
var admin = require('firebase-admin');


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
    var db = admin.database();
    var ref = db.ref("users");
    console.log("ooole");
    ref.orderByChild("id").equalTo(id).once("value").then(function (snapshot){
      var user = snapshot.val();
      if(user){
        console.log("encontro en deserialize");
        console.log(user);
        var keyUser = Object.keys(user);
        console.log(user[keyUser[0]]);
        return done(null, user[keyUser[0]]);
        
      }else{
        console.log("no encontro deserialize");
      }
    });

});

passport.use( new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientId,
    clientSecret: keys.google.clientSecret,
  }, (accessToken, refreshToken, profile, done) => {
    var db = admin.database();
    var dbr = admin.database();
    var ref = db.ref("users");
    console.log("emtr a miraro");
    ref.orderByChild("id").equalTo(profile.id).once("value").then(function (snapshot){
      var user = snapshot.val();
      if(user){
        console.log("encontrol");
        
        var keyUser = Object.keys(user);

        return done(null, user[keyUser[0]]);
        
      }else{
        var correo = profile.emails[0].value;
        var dominio = correo.split('@');
        if(dominio[1] != 'unicauca.edu.co'){
          console.log("entro a fales");
          return done(null,false);
        }
        var nnuser = new User (profile.id, profile.displayName, profile.emails[0].value,profile.photos[0].value,Date.now());
        dbr.ref("users").push(nnuser);
        console.log("no encontro");

        return done(null, nnuser);
        
      }
    });

  }
)
);