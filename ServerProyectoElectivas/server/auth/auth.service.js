'use strict';

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://juanminu:juancho123ma@cluster0-d8vjx.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

var passport = require('passport');
var config = require('../config/keys');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');

var validateJwt = expressJwt({ secret: config.session.cookieKey });

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {

        client.connect(err => {
            const collection = client.db("test").collection("devices");
            // perform actions on the collection object
            collection.findOne({id:req.user.id}, function (err, user) {
                if (err) return next(err);
                if (!user) return res.send(401);
        
                req.user = user;
                client.close();
                next();
              });
            
        });
          
    });
}


/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  return jwt.sign({ id: id }, config.session.cookieKey, { expiresIn : 60*5 });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user) return res.json(404, { message: 'Something went wrong, please try again.'});
  var token = signToken(req.user.id);
  res.cookie('token', JSON.stringify(token));

}

exports.isAuthenticated = isAuthenticated;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;