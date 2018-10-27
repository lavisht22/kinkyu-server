import axios from 'axios';
import auth0 from 'auth0-js';

const CONFIG = {
  SERVICE_URL_PREFIX: '/absurd/api/v1',
};

function generateHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
}

export function getData(serviceUrl) {
  return axios.get(`${CONFIG.SERVICE_URL_PREFIX}${serviceUrl}`, {
    headers: generateHeaders(),
  });
}

export function register(name, email, password) {
  return axios.post(
    `${CONFIG.SERVICE_URL_PREFIX}/app/register`,
    {
      name: name,
      email: email,
      password: password,
    },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

export function login(email, password) {
  //TODO Move out to configuration file
  return new Promise(function(resolve, reject) {
    const webAuth = new auth0.WebAuth({
      domain: 'absurd.auth0.com',
      clientID: '9FKhSEO16QFb52I3hQgcxI2U2ds5t3hW',
      audience: 'https://absurd.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid',
    });

    webAuth.client.login(
      {
        realm: 'Username-Password-Authentication',
        username: email,
        password: password,
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          localStorage.setItem('token', result.idToken);
          resolve();
        }
      }
    );
  });
}

export function logout() {
  //TODO Handle Logout Call, Revoke Token Access
  localStorage.removeItem('token');
}

export function isLoggedIn() {
  if (localStorage.getItem('token')) {
    return true;
  } else {
    return false;
  }
}
