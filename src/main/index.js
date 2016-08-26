import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import initializePromisePolyfill from "./promiseProxy";
import ready from "./ready";
import store from "./reduxStore";

import Hello from "./views/hello/helloContainer.js";
import Fec from "./views/fec/fec.js";

const init = () => {
  var appContainerElement = document.querySelector("div[data-app]");
  var appView = (
    <Provider store={ store }>
      <div>
        <Hello />
        <hr/>
        <Fec />
      </div>
    </Provider>
  );
  
  ReactDOM.render(appView, appContainerElement);
};

ready(init);
