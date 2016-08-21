import eventHandler from "./handler";

import { dispatch } from "../reduxStore";
import incrementAction from "../actionCreators/increment";
import { type as eventType } from "../eventCreators/increment";

const increment = (state, event) => {
  dispatch(incrementAction());
};

export default eventHandler(eventType, increment);
