import Handler from "../handler";

import { dispatch } from "../reduxStore";
import setCandidateNameAction from "../actionCreators/setCandidateName";
import { type as eventType } from "../eventCreators/setCandidateName";

const handler = (state, event) => {
  const name = event.name;
  dispatch(setCandidateNameAction(name));
};

class SetCandidateName extends Handler {
  constructor() {
    super(eventType, handler);
  }
};

export default SetCandidateName;
