import { getState } from "./reduxStore";
import eventBus from "./eventBus";
import dispatchers from "./dispatchers";

dispatchers.map(dispatcher => {
  eventBus.attach(dispatcher);
});

const dispatch = (event) => {
  const state = getState();
  eventBus.dispatch(state, event);
};

export { dispatch as default }; 
