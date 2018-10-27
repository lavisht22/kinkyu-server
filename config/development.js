/** This file stores all the configuration required for various modules to work.
 *  For other environments, all the values should be replaced with environment variables instead.
 *  This file may contain some sensitive information such as Client ID and Secret.
 */

module.exports = {
  auth0: {
    client_id: 'rOH2dLsradz4mVl1pCltncbwsx3X64yY',
    client_secret: 'ozbijXrXMsscZjsF8TMogYiQVcOA3uAHo0TVDjfYYwYc2vMpcsJsPKNRH-V2OI-Z',
    domain: 'absurd.auth0.com',
    jwksUri: 'https://absurd.auth0.com/.well-known/jwks.json',
    issuer: 'https://absurd.auth0.com/',
  },
  MONGODB_URI:
    process.env.MONGODB_URI ||
    'mongodb://heroku_wwjqtms0:n03l90vmesq5748dekjf6obu1u@ds221990.mlab.com:21990/heroku_wwjqtms0',
};
