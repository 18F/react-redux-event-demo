import assign from "lodash.assign";
import { type as setApiKeyType } from "../actionCreators/setApiKey";
import { type as setCandidateNameType } from "../actionCreators/setCandidateName";
import { type as setCandidatesType } from "../actionCreators/setApiResults";

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
  case setCandidatesType:
    return assign({}, state, {
      candidates: action.results
    });
  }
  
  return state;
};

export { fecReducer as default };
