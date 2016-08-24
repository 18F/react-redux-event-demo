import Handler from "../handler";

import { dispatch } from "../reduxStore";
import setApiKeyAction from "../actionCreators/setApiKey";
import { type as eventType } from "../eventCreators/setApiKey";

const setApiKey = (state, event) => {
  const apiKey = event.apiKey;
  dispatch(setApiKeyAction(apiKey));
};

class SetApiKey extends Handler {
  constructor() {
    super(eventType, setApiKey);
  }
};

export default SetApiKey;
