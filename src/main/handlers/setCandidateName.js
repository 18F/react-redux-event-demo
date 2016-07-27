import { dispatch } from "../reduxStore";
import setCandidateNameAction from "../actionCreators/setCandidateName";

export default (name) => {
  dispatch(setCandidateNameAction(name));
};
