import forEach from "lodash.forEach";
import makeHandler from "./handler";
// FIXME: this should take the composition of what it's importing instead
// of wiring it directly
import { getState } from "./reduxStore";
import typeHandlerMap from "./handlers";

let handlerInstances = [];

forEach(typeHandlerMap, (handlers, type) => {
  const typeHandlers = handlers.reduce((accumulator, handler) => {
    const mappedHandler = makeHandler(type, handler);
    return accumulator.concat(mappedHandler);
  }, []);

  handlerInstances = handlerInstances.concat(typeHandlers);
});

const dispatch = (event) => {
  handlerInstances.forEach((handler) => {
    const state = getState();
    handler(state, event);
  });
};

export { dispatch as default }; 
