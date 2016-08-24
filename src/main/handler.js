class Handler {
  constructor(eventType, callback) {
    this.eventType = eventType;
    this.callback = callback;
  }
  handle(state, event) {
    if (event.type !== this.eventType) {
      return Promise.resolve("no-op");
    }
    
    return Promise.resolve(this.callback(state, event));
  }
};

export default Handler;
