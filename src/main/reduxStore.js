import { createStore, combineReducers } from "redux";
import reducers from "./reducers";

const reducer = combineReducers(reducers);
const store = createStore(reducer);

const dispatch = store.dispatch;
const getState = store.getState;

export { store as default, dispatch, getState };
