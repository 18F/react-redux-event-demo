import eventHandler from "./handler";

import { dispatch } from "../reduxStore";
import setCandidateNameAction from "../actionCreators/setCandidateName";
import { type as eventType } from "../eventCreators/setCandidateName";

const setCandidateName = (state, event) => {
  const name = event.name;
  dispatch(setCandidateNameAction(name));
};

export default eventHandler(eventType, setCandidateName);
