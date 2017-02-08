import store from "./reduxStore";
import getDispatchForHandlers from "./eventHandler";
import eventHandlerMap from "./eventHandlers";

const handlerMaps = [
  eventHandlerMap
];

const eventDispatch = getDispatchForHandlers(handlerMaps, store);
const dispatchEvent = eventDispatch.dispatchEvent;

export { dispatchEvent as default }; 
