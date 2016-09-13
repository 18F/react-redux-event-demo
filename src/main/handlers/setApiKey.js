import { dispatch } from "../reduxStore";
import setApiKeyAction from "../actionCreators/setApiKey";

const setApiKey = (state, { apiKey }) => {
  const action = setApiKeyAction(apiKey);
  return dispatch(action);
};

export default setApiKey;
