import Handler from "../handler";

import { dispatch } from "../reduxStore";
import fetchProxy from "../fetchHandler";
import { type as eventType } from "../eventCreators/findCandidatesWithNameLike";
import setCandidatesAction from "../actionCreators/setCandidates";
import setCandidatesErrorAction from "../actionCreators/setCandidatesError";

const hitApi = (state, event) => {
  const candidateName = state.fec.candidateName;
  const apiKey = state.fec.apiKey;
  const url = `https://api.open.fec.gov/v1/names/candidates/?q=${candidateName}&api_key=${apiKey}`;
  return fetchProxy(url)
    .then(processJsonResults)
    .catch(handleError);
};

const processJsonResults = (jsonResults) => {
  const action = setCandidatesAction(jsonResults.results);
  dispatch(action);
};

const handleError = () => {
  const action = setCandidatesErrorAction();
  dispatch(action);
};

class FindCandidatesWithNameLike extends Handler {
  constructor() {
    super(eventType, hitApi);
  }
};

export default FindCandidatesWithNameLike;
