import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import ready from "./ready";
import store from "./reduxStore";

import Hello from "./views/hello";

const init = () => {
  var appContainerElement = document.querySelector("div[data-app]");
  var appView = (
      <Provider store={ store }>
      <Hello />
      </Provider>
  );
  
  ReactDOM.render(appView, appContainerElement);
};

ready(init);
