const express = require('express'); 
const router = express.Router();
//const login = require('../controllers/login.controller');
const passport = require('passport');

var admin = require('firebase-admin');

router.get('/google', passport.authenticate('google', {
    hd:'unicauca.edu.co',
    scope: [
        'profile',
        'email'
    ],
    failureRedirect: '/fallo',
    prompt:'select_account',
    
   
}));

router.get('/cuentaInvalida', function(req,res){
    var responseHtml = '<html><head><title>Main</title></head><body></body><script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script><script>res = %value%; window.opener.postMessage(res,"*");';
    responseHtml += 'alert("cuenta no valida");window.location.replace("http://localhost:3000/auth/google"); </script></html>'
    //res.json("jooooder");
    console.log(req.originalUrl);
    responseHtml = responseHtml.replace("%value%",JSON.stringify({
        user: null,
        success: false,
    }));
     
    res.send(responseHtml);
    
});

router.get('/google/redirect',
    passport.authenticate('google',{failureRedirect: '/auth/cuentaInvalida'}), (req, res) => {
    console.log(req.user);


    var correo = req.user.correo;
    var dominio = correo.split('@');
    var responseHtml = '<html><head><title>Main</title></head><body></body><script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script><script>res = %value%; window.opener.postMessage(res,"*");';
    console.log("dominio: ",dominio[1]);
    if(dominio[1] === 'unicauca.edu.co'){
        responseHtml = responseHtml.replace("%value%",JSON.stringify({
            user: req.user,
            success: true
        }));
        responseHtml += 'window.close();</script></html>';
        res.status(200).send(responseHtml);
    } else {
        var db = admin.database();
        var ref = db.ref("users");
        console.log("vamos a eliminar: ",req.user);
///
ref.orderByChild("id").equalTo(req.user.id).once("value").then(function (snapshot){
    var user = snapshot.val();
    if(user){
      console.log("encontro para borrar");
      
      var keyUser = Object.keys(user);
      ref.child(keyUser[0]).remove();
    }else{
      console.log("no encontro para borrar");
    }
  });
///

        
        req.logOut();
        console.log(req.user);
        req.session = null;
        responseHtml += 'alert("Usuario no pertenece a unicauca.edu.co"); window.location.replace("https://accounts.google.com/logout");</script></html>'
        responseHtml = responseHtml.replace("%value%",JSON.stringify({
            user: "usuario no valido",
            success: false
        }));
        //res.status(200).send(responseHtml);
        res.clearCookie('Holiwisfuncione').send(responseHtml);
    }
});
/*

router.get('/google/redirect',
    passport.authenticate('google'),
function(req, res) {
    var correo = req.user.correo;
    var dominio = correo.split('@');
    var responseHtml = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res,"*");window.close()</script></html>';
    console.log("dominio: ",dominio[1]);
    if(dominio[1] === 'unicauca.edu.co'){
        responseHtml = responseHtml.replace("%value%",JSON.stringify({
            user: req.user,
            success: true
        }));
        res.status(200).send(responseHtml);
    }else{
        req.logOut();
        responseHtml = responseHtml.replace("%value%",JSON.stringify({
            user: req.user,
            success: false
        }));
        res.status(200).send(responseHtml);
        
    }

});*/

router.get('/user',(req, res) => {
    console.log(req.user);
    if(req.user === undefined){
        console.log("holi");
        res.status(200).json("joder");
    }
    res.status(200).json(req.user);
});


//router.post('/user', login.user);

function isLoggedIn(req, res, next) {
    console.log("entro");
    if (req.isAuthenticated())
        return next();
    res.status(400).json({
        'message': 'access denied'
    });
}

module.exports = router;