import { dispatch } from "../reduxStore";
import setCandidateNameAction from "../actionCreators/setCandidateName";

const setCandidateName = (state, { name }) => {
  const action = setCandidateNameAction(name);
  return dispatch(action);
};

export default setCandidateName;
