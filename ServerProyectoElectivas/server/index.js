const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cors = require('cors');
const {google} = require('googleapis');


var path = require('path');
var exphbs = require('express-handlebars');
var bodyparser = require('body-parser');
var admin = require('firebase-admin');


const app = express();
app.use(cors());





//app.use(express.static('public'));
app.use(favicon(path.join('views','favicon.ico')));

//const {mongoose} = require('./database');

// Settings
app.set('port', process.env.PORT || 3000);
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Middlewares
app.use(morgan('dev'));
//app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json({limit: '50mb'}));

app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));

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


app.get('/', function(req, res){

    res.render('home',{title:'Listas dexx preinscripción'});
});


app.get('/asigElect', function(req, res){
    
    var list;
    var ref = db.ref();
    // Attach an asynchronous callback to read the data at our posts reference
    ref.once("value", function(snapshot) {
        list = snapshot.val();

        res.render('list',{title:'Lista de preinscripciones',list:list});
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    
});

//--------------------------------------------------------
const googleConfig  = new google.auth.OAuth2{
    clientId: "99185129164-nqe1vdpu6qka0qidomi0qp7efs78epa9.apps.googleusercontent.com",
    clientSecret: "xi_-iQI1JRZ80G2dZgppMyX0",
    redirect: "http://localhost:4200/Administrador",
    };
  
  // generate a url that asks permissions for Blogger and Google Calendar scopes
  const defaultScope  = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
  ];
  
  function createConnection() {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
  }
  
  function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: defaultScope
    });
  }
  
  function getGooglePlusApi(auth) {
    return google.plus({ version: 'v1', auth });
  }
  function urlGoogle() {
    const auth = createConnection();
    const url = getConnectionUrl(auth);
    return url;
  }
  
  
  function getGoogleAccountFromCode(code) {
    const data = await auth.getToken(code);
    const tokens = data.tokens;
    const auth = createConnection();
    auth.setCredentials(tokens);
    const plus = getGooglePlusApi(auth);
    const me = await plus.people.get({ userId: 'me' });
    const userGoogleId = me.data.id;
    const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
    return {
      id: userGoogleId,
      email: userGoogleEmail,
      tokens: tokens,
    };
  }

//--------------------------------------------------------

// Starting server
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
    
});


