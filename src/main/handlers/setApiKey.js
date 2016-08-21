import eventHandler from "./handler";

import { dispatch } from "../reduxStore";
import setApiKeyAction from "../actionCreators/setApiKey";
import { type as eventType } from "../eventCreators/setApiKey";

const setApiKey = (state, event) => {
  const apiKey = event.apiKey;
  dispatch(setApiKeyAction(apiKey));
};

export default eventHandler(eventType, setApiKey);
