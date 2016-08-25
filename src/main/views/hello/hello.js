import React from "react";
import { connect } from "react-redux";

import eventDispatch from "../../eventDispatch";
import incrementEvent from "../../eventCreators/increment";

const increment = () => {
  eventDispatch(incrementEvent());
};

const hello = ({ count }) => {
  return (
      <div>Hello world: { count }
        <hr/>
        <button type="button" title="increment" onClick={ increment }>increment</button>
      </div>
  );
};

export default connect(state => {
  return state.hello;
})(hello);
