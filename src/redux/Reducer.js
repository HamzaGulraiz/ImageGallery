// redux/reducers/countReducer.js
const initialState = {
  tokenValue: '',
};

export default (state = initialState, action) => {
  if (action.type === 'USER_TOKEN') {
    // If so, make a copy of `state`

    return {
      // and update the copy with the new value
      tokenValue: (state.tokenValue = action.payload),
    };
  }
  // otherwise return the existing state unchanged
  return state;
};
