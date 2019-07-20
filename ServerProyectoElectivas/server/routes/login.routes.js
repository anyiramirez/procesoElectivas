const express = require('express'); 
const router = express.Router();
const login = require('../controllers/login.controller');
const passport = require('passport');

//router.get('/google', login.login);
//router.post('/google/user', login.user);

router.get('/google', passport.authenticate('google', {
    scope: [
        'profile',
        'email'
    ], 
}));

/*router.get('/google/redirect', passport.authenticate('google'), (req,res) => {
   /*var responseHtml = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res,"*");window.close()</script></html>';
   responseHtml = responseHtml.replace("%value%",JSON.stringify({
       user: req.user
   }));
   res.json(req.user);
});*/

router.get('/google/redirect',
    passport.authenticate('google'),
function(req, res) {
    var responseHtml = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res,"*");window.close()</script></html>';
   responseHtml = responseHtml.replace("%value%",JSON.stringify({
       user: req.user
   }));
   console.log("user:",req.user);
   req.logOut();
   console.log("user:",req.user);
   res.status(200).send("responseHtml");
    //res.json(req.user);
});

router.get('/user',passport.authenticate('google'),
(req, res)=> {
var responseHtml = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res,"*");window.close()</script></html>';
   responseHtml = responseHtml.replace("%value%",JSON.stringify({
       user: req.user
   }));
   res.status(200).send(responseHtml);
   
   // res.json(req.user);
});


router.post('/user', login.user);

module.exports = router;