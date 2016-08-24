import Handler from "../handler";

import { dispatch } from "../reduxStore";
import fetchProxy from "../fetchHandler";
import { type as eventType } from "../eventCreators/findCandidatesWithNameLike";
import setApiResultsAction from "../actionCreators/setApiResults";
import setApiResultsErrorAction from "../actionCreators/setApiResultsError";

const hitApi = (state, event) => {
  const candidateName = state.fec.candidateName;
  const apiKey = state.fec.apiKey;
  const url = `https://api.open.fec.gov/v1/names/candidates/?q=${candidateName}&api_key=${apiKey}`;
  return fetchProxy(url)
    .then(processJsonResults)
    .catch(handleError);
};

const processJsonResults = (jsonResults) => {
  const action = setApiResultsAction(jsonResults.results);
  dispatch(action);
};

const handleError = () => {
  const action = setApiResultsErrorAction();
  dispatch(action);
};

class FindCandidatesWithNameLike extends Handler {
  constructor() {
    super(eventType, hitApi);
  }
};

export default FindCandidatesWithNameLike;
