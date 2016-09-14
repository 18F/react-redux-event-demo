import forEach from "lodash.forEach";

const ignoredPromiseResolution = "no-op";
const resolvedPromise = Promise.resolve(ignoredPromiseResolution);

const makeHandler = (eventType, callback) => {
  return (state, event) => {
    if (event.type !== eventType) {
      return resolvedPromise;
    }
    
    return Promise.resolve(callback(state, event));
  };
};

const getDispatchForHandlers = (typeHandlerMap, getState) => {
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

  return dispatch;
};

export { getDispatchForHandlers, makeHandler, ignoredPromiseResolution as ignored };
