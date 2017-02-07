import setCandidateNameAction from "../actionCreators/setCandidateName";

const setCandidateName = ({ dispatch, event: { name } }) => {
  const action = setCandidateNameAction(name);
  return dispatch(action);
};

export default setCandidateName;
