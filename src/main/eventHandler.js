import { difference, forEach } from "lodash";

const makeHandler = (eventType, callback) => {
  return (event, getState, dispatch, dispatchEvent) => {
    if (event.type !== eventType) {
      return;
    }
    const state = getState();

    callback({state, dispatch, getState, event, dispatchEvent});
  };
};

const getDispatchForHandlers = (typedHandlerMaps, { getState, dispatch }) => {
  let handlerInstances = [];
  let attachedHandlers = [];
  
  const appendHandlersForMappings = (typedHandlerMap) => {
    forEach(typedHandlerMap, (handlers, type) => {
      const typeHandlers = handlers.reduce((accumulator, handler) => {
        const mappedHandler = makeHandler(type, handler);
        return accumulator.concat(mappedHandler);
      }, []);
      
      handlerInstances = handlerInstances.concat(typeHandlers);
    });
  };
  
  typedHandlerMaps.forEach(appendHandlersForMappings);

  const dispatchEvent = (event) => {
    handlerInstances.forEach((handler) => {
      handler(event, getState, dispatch, dispatchEvent);
    });
    attachedHandlers.forEach((handler) => {
      const state = getState();
      handler({state, dispatch, getState, event, dispatchEvent});
    });
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
