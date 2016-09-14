import React from "react";

import dispatchEvent from "../../dispatchEvent";
import incrementEvent from "../../eventCreators/increment";

const increment = () => {
  dispatchEvent(incrementEvent());
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
