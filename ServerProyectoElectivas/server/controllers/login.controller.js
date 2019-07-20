const {google} = require('googleapis');


const loginCtrl = {}

loginCtrl.login = (req,res) => {
    res.json(urlGoogle());
}

loginCtrl.user = (req,res) => {
  
  console.log(req.body.codigo);
  
  var respond = getGoogleAccountFromCode(req.body.codigo)
  res.json(respond);
}

const googleConfig  = {
    clientId: '99185129164-1s1n2uc1fkclg46cpl8o4bhas1oqlf0e.apps.googleusercontent.com',
    clientSecret: 'd611mn-3RcgTKU2jlN-Vw7f9',
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

  
  async function getGoogleAccountFromCode(code) {
    const oauth2Client = createConnection();
    const me = null;
    
    try {
      var a = "" + code;  
      const {tokens} = await oauth2Client.getToken(a, function(err, token) {
        if (err) {
          console.log('Error while trying to retrieve access token', err);
          return;
        }
        oauth2Client.credentials = token;
        
      });
      oauth2Client.setCredentials(tokens);
    
      const plus = getGooglePlusApi(oauth2Client);
      me = await plus.people.get({ userId: 'me' });      
    } catch (e) {
      console.log("entro");
    }
    if(me === null){
      return null;
    } else{
      const userGoogleId = me.data.id;
      const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
      return {
        id: userGoogleId,
        email: userGoogleEmail
      }
    }
   
  }
 
//--------------------------------------------------------





module.exports = loginCtrl;

