import { type as incrementType } from "../actionCreators/increment";

const defaultState = () => {
  return createState(0);
};

const createState = count => ({
  count: count
});

const helloReducer = (state, action) => {
  if (!state) {
    return defaultState();
  }

  switch (action.type) {
  case incrementType:
    const currentCount = state.count;
    return createState(currentCount + 1);
  }

  return state;
};

export { helloReducer as default };
