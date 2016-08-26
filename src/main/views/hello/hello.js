import React from "react";

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

export default hello;
