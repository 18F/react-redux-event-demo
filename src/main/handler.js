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

export default makeHandler;
export { ignoredPromiseResolution as ignored };
