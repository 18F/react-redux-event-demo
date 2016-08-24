import Handler from "../handler";

import { dispatch } from "../reduxStore";
import incrementAction from "../actionCreators/increment";
import { type as eventType } from "../eventCreators/increment";

const increment = (state, event) => {
  dispatch(incrementAction());
};

class Increment extends Handler {
  constructor() {
    super(eventType, increment);
  }
};

export default Increment;
