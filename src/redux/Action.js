// redux/actions/countAction.js
export const userTokenRedux = ({token}) => {
  return {
    type: 'USER_TOKEN',
    payload: {
      tokenValue: token,
    },
  };
};
