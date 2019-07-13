const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cors = require('cors');



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
app.use('/login',require('./routes/login.routes'));


//--------------------------------------------------------


// Starting server
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
    
});


