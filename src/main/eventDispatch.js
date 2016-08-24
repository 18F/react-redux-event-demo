import { getState } from "./reduxStore";
import Handlers from "./handlers";

const handlerInstances = Handlers.reduce((instances, Handler) => {
  return instances.concat(new Handler());
}, []);

const dispatch = (event) => {
  handlerInstances.forEach((handler) => {
    const state = getState();
    handler.handle(state, event);
  });
};

export { dispatch as default }; 
