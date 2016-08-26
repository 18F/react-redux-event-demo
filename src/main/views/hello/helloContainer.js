import { connect } from "react-redux";

import Hello from "./hello";

export default connect(state => {
  return state.hello;
})(Hello);
