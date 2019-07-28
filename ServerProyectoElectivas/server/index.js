const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cors = require('cors');
const passportSetup = require('./config/passport-setup');
const keysS = require('./config/keys');
var cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');



//---------------



//---------------

var path = require('path');
var exphbs = require('express-handlebars');
var bodyparser = require('body-parser');
var admin = require('firebase-admin');


const app = express();

var originsWhitelist = [
  'http://localhost:4200',      //this is my front-end url for development
   'http://www.myproductionurl.com'
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}



app.use(cors(corsOptions));


app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: [keysS.session.cookieKey],

}));

app.use(passport.initialize());
app.use(passport.session());
//app.use(express.static('public'));
app.use(favicon(path.join('views','favicon.ico')));

// Settings
app.set('port', process.env.PORT || 3000);
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Middlewares
app.use(morgan('dev'));

app.use(bodyparser.json({limit: '50mb'}));

app.use(bodyparser.urlencoded({limit: '50mb', extended: false}));

app.use(express.json());

//----------------------------------
// Fetch the service account key JSON file contents
var serviceAccount = require("./procesoeectivas-firebase-adminsdk-zdn8g-9a9ff23d08.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://procesoeectivas.firebaseio.com/"
});

var db = admin.database();
//----------------------------------
// Routes

app.use('/api/asigcupos',require('./routes/asigcupos.routes'));
app.use('/auth',require('./routes/login.routes'));
app.use('/asigrol',require('./routes/adminAsigRol.routes'));

//--------------------------------------------------------


// Starting server
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
    
});


