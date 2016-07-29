import { dispatch, getState } from "../reduxStore";
import fetchProxy from "../fetchHandler";
import setApiResultsAction from "../actionCreators/setApiResults";
import setApiResultsErrorAction from "../actionCreators/setApiResultsError";

const hitApi = () => {
  const state = getState();
  const candidateName = state.fec.candidateName;
  const apiKey = state.fec.apiKey;
  const url = `https://api.open.fec.gov/v1/names/candidates/?q=${candidateName}&api_key=${apiKey}`;
  const fetchPromise = fetchProxy(url)
          .then(processResults)
          .catch(handleError);
};

const processResults = (results) => {
  results.json().then(processJsonResults);
};

const processJsonResults = (jsonResults) => {
  const action = setApiResultsAction(jsonResults.results);
  dispatch(action);
};

const handleError = () => {
  const action = setApiResultsErrorAction();
  dispatch(action);
};

export default hitApi;
