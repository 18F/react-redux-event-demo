import { type as setApiKeyType } from "../actionCreators/setApiKey";

const defaultState = () => {
  return { hasResults: false };
};

const fecReducer = (state, action) => {
  if (!state) {
    return defaultState();
  }

  return state;
};

export { fecReducer as default };
