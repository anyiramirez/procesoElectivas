const {google} = require('googleapis');


const loginCtrl = {}

loginCtrl.login = (req,res) => {
    res.json(urlGoogle());
}

loginCtrl.user = (req,res) => {
  console.log(getGoogleAccountFromCode());
  res.json("Llego");
}

const googleConfig  = {
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

  
  async function getGoogleAccountFromCode(code) {
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



module.exports = loginCtrl;

