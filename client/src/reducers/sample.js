const intialState = {
  text: 'Hello from Reducer!',
  name: 'Lavish Thakkar',
};

export default (state = intialState, action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.payload.name,
      };

    default:
      return state;
  }
};
