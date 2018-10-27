const intialState = {
  id: '',
  name: '',
  email: '',
  picture: '',
  phone: '',
};

export default (state = intialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_PROFILE_FULFILLED':
      console.log('Reached FUL');
      return {
        ...state,
        id: action.payload.data.sub,
        email: action.payload.data.email,
        name: action.payload.data.nickname,
        picture: action.payload.data.picture,
        phone: action.payload.data.phone || '',
      };

    case 'FETCH_FULFILLED':
      return {
        ...state,
        email: action.payload.data.title,
      };

    default:
      return state;
  }
};
