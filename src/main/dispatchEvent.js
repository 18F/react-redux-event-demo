import { getDispatchForHandlers } from "./handler";
import { getState } from "./reduxStore";
import typeHandlerMap from "./handlers";

const dispatchEvent = getDispatchForHandlers(typeHandlerMap, getState);

export { dispatchEvent as default }; 
