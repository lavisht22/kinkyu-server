/**lib/app/index.js
 * Contains all logic corresponding to app controller
 */

const mongoose = require('mongoose');
const auth0Helper = require('../helpers/auth0');
const { User } = require('../app/models');
const { ERROR_TYPES } = require('../config/constants');

async function registerUser(userObject) {
  //Validation for required fields.
  if (!userObject.email) {
    throw {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Email is required.',
    };
  }

  if (!userObject.password) {
    throw {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Password is required.',
    };
  }

  if (!userObject.name) {
    throw {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Validation Error',
      error_details: 'Name is required.',
    };
  }

  let auth0UserData, user;

  //Check if user already exists
  try {
    user = await User.findOne({ email: userObject.email });
  } catch (error) {
    throw {
      error_type: ERROR_TYPES.DB_ERROR,
      error_msg: 'Unable to create a new user',
      error_description: error,
    };
  }

  if (user) {
    throw {
      error_type: ERROR_TYPES.INVALID_PAYLOAD,
      error_msg: 'Unable to create a new user.',
      error_details: 'An account with this email already exists.',
    };
  }

  //Create an account in Auth0
  try {
    auth0UserData = await auth0Helper.createNewUser(userObject);
  } catch (error) {
    throw {
      error_type: ERROR_TYPES.SERVICE_ERROR,
      error_msg: 'Unable to create a new user.',
      error_details: error,
    };
  }

  userObject.auth0_id = auth0UserData.user_id;

  user = new User(userObject);

  //Create an account in application database with linked auth0_id
  try {
    user = await user.save();
  } catch (error) {
    throw {
      error_type: ERROR_TYPES.DB_ERROR,
      error_msg: 'Unable to create a new user.',
      error_details: error,
    };
  }

  return user;
}

module.exports = {
  registerUser,
};
