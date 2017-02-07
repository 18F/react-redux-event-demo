import incrementAction from "../actionCreators/increment";

const increment = ({ dispatch }) => {
  return dispatch(incrementAction());
};

export default increment;
