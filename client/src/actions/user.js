import { getData } from '../utils/serviceUtil';

const USER_PROFILE_URL = '/user/profile';

export const fetchUserProfile = () => {
  return {
    type: 'FETCH_USER_PROFILE',
    payload: getData(USER_PROFILE_URL),
  };
};

export const fetchRoute = () => {
  return {
    type: 'FETCH',
    payload: getData('/'),
  };
};
