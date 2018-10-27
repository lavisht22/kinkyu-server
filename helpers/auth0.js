/** Auth0 Helper File
 * Contains functionality to interact with Auth0 to create and manage new users.
 */
const axios = require('axios');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const CONFIG = require('../config');

// Express Middleware to check the incoming JWT and validate it
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: CONFIG.auth0.jwksUri,
  }),

  // Validate the audience and the issuer.
  issuer: CONFIG.auth0.issuer,
  algorithms: ['RS256'],
});

/**
 * Function to get temporary access token for Auth0
 * @returns {Promise} Access Token
 */
function getAccessToken() {
  return axios
    .post(
      `https://${CONFIG.auth0.domain}/oauth/token`,
      {
        client_id: CONFIG.auth0.client_id,
        client_secret: CONFIG.auth0.client_secret,
        grant_type: 'client_credentials',
        audience: `https://${CONFIG.auth0.domain}/api/v2/`,
      },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then(function(response) {
      return response.data.access_token;
    });
}

/**
 * Function to create a new user in Auth0
 * @param {Object} userObject User Object with relevant user data.
 * @returns {Promise} User Object received from Auth0
 */
function createNewUser(userObject) {
  return getAccessToken()
    .then(function(accessToken) {
      console.log('got access');
      return axios.post(
        `https://${CONFIG.auth0.domain}/api/v2/users`,
        {
          connection: 'Username-Password-Authentication',
          email: userObject.email,
          password: userObject.password,
          user_metadata: {
            email: userObject.email,
            phone: userObject.phone,
            name: userObject.name,
          },
          email_verified: false,
          verify_email: false,
          app_metadata: {},
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    })
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      throw error.response.data.message;
    });
}

module.exports = {
  createNewUser,
  checkJwt,
};
