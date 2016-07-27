import assign from "lodash.assign";
import { type as setApiKeyType } from "../actionCreators/setApiKey";
import { type as setCandidateNameType } from "../actionCreators/setCandidateName";

const defaultState = () => {
  return { hasResults: false };
};

const fecReducer = (state, action) => {
  if (!state) {
    return defaultState();
  }

  switch(action.type) {
  case setApiKeyType:
    return assign({}, state, {
      apiKey: action.apiKey
    });
  case setCandidateNameType:
    return assign({}, state, {
      candidateName: action.name
    });
  }
  
  return state;
};

export { fecReducer as default };
