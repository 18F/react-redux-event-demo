import MiniSignals from "mini-signals";

const miniSignals = new MiniSignals();
const listeners = {};

const detach = (func) => {
  if (listeners[func]) {
    listeners[func].detach();
  }
};

const eventBus = {
  dispatch(event) {
    miniSignals.dispatch(event);
  },
  attach(func) {
    detach(func);
    listeners[func] = miniSignals.add(func);
  }
};

export { eventBus as default };
