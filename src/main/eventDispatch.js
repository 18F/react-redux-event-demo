import { getDispatchForHandlers } from "./handler";
import { getState } from "./reduxStore";
import typeHandlerMap from "./handlers";

const dispatch = getDispatchForHandlers(typeHandlerMap, getState);

export { dispatch as default }; 
