import store from "./reduxStore";
import getDispatchForHandlers from "./eventHandler";
import eventHandlerMap from "./eventHandlers";

const handlerMaps = [
  eventHandlerMap
];

const eventHandler = getDispatchForHandlers(handlerMaps, store);
const dispatchEvent = eventHandler.dispatchEvent;

export { dispatchEvent as default }; 
