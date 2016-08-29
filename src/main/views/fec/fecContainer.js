import { connect } from "react-redux";

import Fec from "./fec";

export default connect(state => {
  return state.fec;
})(Fec);
