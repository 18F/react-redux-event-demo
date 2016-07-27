import { dispatch } from "../reduxStore";
import setApiKeyAction from "../actionCreators/setApiKey";

export default (apiKey) => {
  dispatch(setApiKeyAction(apiKey));
};
