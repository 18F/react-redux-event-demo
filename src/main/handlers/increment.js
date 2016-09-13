import { dispatch } from "../reduxStore";
import incrementAction from "../actionCreators/increment";

const increment = (state, event) => {
  return dispatch(incrementAction());
};

export default increment;
