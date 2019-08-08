const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require("./keys")
const User = require("./user")
//----- add firebase
var admin = require('firebase-admin');


passport.serializeUser((user, done) => {
  done(null, user.correo);
});

passport.deserializeUser((correo, done) => {
    var db = admin.database();
    var ref = db.ref("users");
    ref.orderByChild("correo").equalTo(correo).once("value").then(function (snapshot){
      var userv = snapshot.val();
      
      if(userv){
        console.log("encontro en deserialize");
        console.log(userv);
        var keyUser = Object.keys(userv);
        console.log(userv[keyUser[0]]);
        var usuario = userv[keyUser[0]];
        if(usuario.rol != "estudiante"){


        }
        return done(null, usuario);
        
      }else{
        console.log("no encontro deserialize");
        return done(null, false);
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
    var dbrr = admin.database();
    var ref = db.ref("users");
    console.log("usuario",profile.displayName);
    ref.orderByChild("correo").equalTo(profile.emails[0].value).once("value").then(function (snapshot){
      var user = snapshot.val();
      console.log("entrooooasdf");
      var keyUser = Object.keys(user);
      var usuario = user[keyUser[0]];
      if(user){
        
        if(usuario.rol != "estudiante"){
          if(!usuario.datosCompletos){
            var nuevoUsuario = {
              id: profile.id,
              NombreCompleto: profile.displayName,
              correo: profile.emails[0].value,
              foto: profile.photos[0].value,
              fcreacion: Date.now(),
              rol: usuario.rol,
              datosCompletos: true,
              estado: true
            }
            
            var refUpdate = dbrr.ref('users/' + keyUser[0]);
            refUpdate.update(nuevoUsuario);
            return done(null, nuevoUsuario);
          }else{
            /*if(!usuario.datosCompletos){
              var nuevoUsuario = {
                id: profile.id,
                NombreCompleto: profile.displayName,
                correo: profile.emails[0].value,
                foto: profile.photos[0].value,
                fcreacion: Date.now(),
                rol: usuario.rol,
                datosCompletos: true,
                estado: true
              }*/
              console.log("guardar",usuario);
              return done(null, usuario);
          }/*else{
              return done(null, usuario);
            }*/
            
          
          
        }else{
          return done(null, usuario);
        }
        //colocar bandera en base de datos
        //buscar por correo, y si tiene rol diferente averiguarle si estan completos los datos,(se averigua con la bandera) sino al usuario completar el usuario para devolverlo
        //completar usuario si tiene rol
        
        
      }else{
        var correo = profile.emails[0].value;
        var dominio = correo.split('@');
        console.log("correoooo:",correo);
        if(dominio[1] != 'unicauca.edu.co'){
          console.log("Correo no valido");

          return done(null,false);
        }
        //var nnuser = new User (profile.id, profile.displayName, profile.emails[0].value,profile.photos[0].value,Date.now());
        var nuevoUsuario = {
          id: profile.id,
          NombreCompleto: profile.displayName,
          correo: profile.emails[0].value,
          foto: profile.photos[0].value,
          fcreacion: Date.now(),
          rol: "estudiante",
          datosCompletos: true
        }
        dbr.ref("users").push(nuevoUsuario);
        console.log("no encontro");

        return done(null, nuevoUsuario);
        
      }
    });

  }
)
);