const express = require('express'); 
const router = express.Router();
const login = require('../controllers/login.controller');
const passport = require('passport');
var auth = require('../auth/auth.service')
//router.get('/google', login.login);
//router.post('/google/user', login.user);

router.get('/google', passport.authenticate('google', {
    scope: [
        'profile',
        'email'
    ]
   
}));

/*router.get('/google/redirect', passport.authenticate('google'), (req,res) => {
   /*var responseHtml = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res,"*");window.close()</script></html>';
   responseHtml = responseHtml.replace("%value%",JSON.stringify({
       user: req.user
   }));
   res.json(req.user);
});*/


router.get('/google/redirect',
    passport.authenticate('google'), (req, res) => {
    console.log(req.user);


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
    } else {
        req.logOut();
        responseHtml = responseHtml.replace("%value%",JSON.stringify({
            user: "usuario no valido",
            success: false
        }));
        res.status(200).send(responseHtml);
        
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