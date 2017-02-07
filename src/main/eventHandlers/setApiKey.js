import setApiKeyAction from "../actionCreators/setApiKey";

const setApiKey = ({ dispatch, event: { apiKey } }) => {
  const action = setApiKeyAction(apiKey);
  return dispatch(action);
};

export default setApiKey;
