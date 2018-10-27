import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'absurd.auth0.com',
    clientID: '9FKhSEO16QFb52I3hQgcxI2U2ds5t3hW',
    audience: 'https://absurd.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid',
  });

  login() {
    this.auth0.authorize();
  }
}
