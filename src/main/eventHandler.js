import { difference, forEach } from "lodash";

const makeHandler = (eventType, callback) => {
  return ({ state, event, getState, dispatch, dispatchEvent }) => {
    if (event.type !== eventType) {
      return;
    }

    callback({state, dispatch, getState, event, dispatchEvent});
  };
};

const getDispatchForHandlers = (typedHandlerMaps, { getState, dispatch }) => {
  let attachedHandlers = [];
  
  const appendHandlersForMappings = (initialHandlers, typedHandlerMap) => {
    forEach(typedHandlerMap, (handlers, type) => {
      const typeHandlers = handlers.reduce((accumulator, handler) => {
        const mappedHandler = makeHandler(type, handler);
        return accumulator.concat(mappedHandler);
      }, []);
      
      initialHandlers = initialHandlers.concat(typeHandlers);
    });
    
    return initialHandlers;
  };
  
  const initialHandlers = typedHandlerMaps.reduce(appendHandlersForMappings, []);

  const dispatchEvent = (event) => {
    const applyHandler = (handler) => {
      const state = getState();
      handler({ state, event, getState, dispatch, dispatchEvent });
    };
    
    initialHandlers.forEach(applyHandler);
    attachedHandlers.forEach(applyHandler);
  };

  const attach = (handler) => {
    attachedHandlers = attachedHandlers.concat(handler);
  };

  const detach = (handler) => {
    attachedHandlers = difference(attachedHandlers, [ handler ]);
  };
  
  return { dispatchEvent, attach, detach };
};

export { getDispatchForHandlers as default };
