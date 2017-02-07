import fetchProxy from "../fetchHandler";
import setCandidatesAction from "../actionCreators/setCandidates";
import setCandidatesErrorAction from "../actionCreators/setCandidatesError";

const findCandidatesWithNameLike = ({ dispatch, state: { fec: { candidateName, apiKey } } }) => {
  const url = `https://api.open.fec.gov/v1/names/candidates/?q=${candidateName}&api_key=${apiKey}`;
  return fetchProxy(url)
    .then(processJsonResults({ dispatch }))
    .catch(handleError({ dispatch }));
};

const processJsonResults = ({ dispatch }) => {
  return ({ results }) => {
    const action = setCandidatesAction(results);
    return dispatch(action);
  };
};

const handleError = ({ dispatch }) => {
  return () => {
    const action = setCandidatesErrorAction();
    return dispatch(action);
  };
};

export default findCandidatesWithNameLike;

