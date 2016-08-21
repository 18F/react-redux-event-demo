import Promise from "../promiseProxy";

const eventHandler = (eventType, callback) => {
  return (state, event) => {
    if (event.type !== eventType) {
      return Promise.resolve("no-op");
    }
    
    return Promise.resolve(callback(state, event));
  };
};

export default eventHandler;
