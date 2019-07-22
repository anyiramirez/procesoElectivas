const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require("./keys")
const User = require("./user")
//const User = require('../models/userm');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://juanminu:juancho123ma@cluster0-d8vjx.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });



passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  client.connect(err => {
    if(!err){
      const collection = client.db("gestionUser").collection("users");
      collection.findOne({id: id}).then((user) => {
        
        console.log("encontro: ",user);
        
        return done(null, user);
      });
    }else{
      console.log("paila");
      return done(err);
      
    }
    
  })
});

passport.use( new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientId,
    clientSecret: keys.google.clientSecret,
  }, (accessToken, refreshToken, profile, done) => {
    client.connect(err => {
      if(!err){
        const collection = client.db("gestionUser").collection("users");
        // perform actions on the collection object
        collection.findOne({id: profile.id}).then((currentUser) => {
          if(currentUser){
            
            return done(null, currentUser);
          }else{
            var nuser = new User (profile.id, profile.displayName, profile.emails[0].value,profile.photos[0].value,Date.now());
            collection.insertOne(nuser, function(){
              console.log("Informacion guardada de: ",nuser);
              
              return done(null, nuser);
            });
            
          }
        });
      }else{
        console.log(err);
      }
      
    
    });
 
   
/*
    if (profile) {
      var nuser = null;
      if(profile.photos.length > 0){
        new User({
          username: profile.displayName,
          googleId: profile.id
        }).save().then((newUser) => {
          console.log('new user creaated:' + newUser);
        });
        //nuser = new User (profile.id, profile.displayName, profile.emails[0].value,profile.photos[0].value,Date.now());
      } else {
        //nuser = new User (profile.id, profile.displayName, profile.emails[0].value,null,Date.now());
      } 
      
      //return done(null, nuser);
      }
      else {
      //return done(null, false);
      }*/
  }
)
);