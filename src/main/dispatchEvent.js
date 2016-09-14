import { getDispatchForHandlers } from "./eventHandler";
import { getState } from "./reduxStore";
import typeHandlerMap from "./eventHandlers";

const dispatchEvent = getDispatchForHandlers(typeHandlerMap, getState);

export { dispatchEvent as default }; 
