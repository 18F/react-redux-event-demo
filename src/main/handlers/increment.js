import { dispatch } from "../reduxStore";
import incrementAction from "../actionCreators/increment";

export default () => {
  dispatch(incrementAction());
};
