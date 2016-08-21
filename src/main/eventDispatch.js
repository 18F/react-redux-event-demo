import { getState } from "./reduxStore";
import dispatchers from "./dispatchers";

const dispatch = (event) => {
  dispatchers.forEach((handler) => {
    const state = getState();
    handler(state, event);
  });
};

export { dispatch as default }; 
