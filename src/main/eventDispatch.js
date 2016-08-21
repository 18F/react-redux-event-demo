import { getState } from "./reduxStore";
import handlers from "./handlers";

const dispatch = (event) => {
  handlers.forEach((handler) => {
    const state = getState();
    handler(state, event);
  });
};

export { dispatch as default }; 
