import { dispatch } from "../reduxStore";
import fetchProxy from "../fetchHandler";
import setCandidatesAction from "../actionCreators/setCandidates";
import setCandidatesErrorAction from "../actionCreators/setCandidatesError";

const findCandidatesWithNameLike = ({ fec: { candidateName: candidateName, apiKey: apiKey } }, event) => {
  const url = `https://api.open.fec.gov/v1/names/candidates/?q=${candidateName}&api_key=${apiKey}`;
  return fetchProxy(url)
    .then(processJsonResults)
    .catch(handleError);
};

const processJsonResults = ({ results }) => {
  const action = setCandidatesAction(results);
  return dispatch(action);
};

const handleError = () => {
  const action = setCandidatesErrorAction();
  return dispatch(action);
};

export default findCandidatesWithNameLike;

