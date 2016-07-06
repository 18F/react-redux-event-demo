import eventBus from "./eventBus";
import dispatchers from "./dispatchers";

dispatchers.map(dispatcher => {
  eventBus.attach(dispatcher);
});

const dispatch = (event) => {
  eventBus.dispatch(event);
};

export { dispatch as default }; 
