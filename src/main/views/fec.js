import React from "react";
import { connect } from "react-redux";

import Results from "./fecResults";
import Form from "./fecForm";

const fec = ({ apiKey, candidates }) => {
  return (
    <div>
      { emitForm(apiKey) }
      { emitResults(candidates) }
    </div>
  );
};

const emitForm = (apiKey) => {
  return <Form apiKey={ apiKey }/>;
};

const emitResults = (candidates) => {
  const hasResults = candidates;

  if (hasResults) {
    return <Results results={ candidates }/>;
  }
};

export default connect(state => {
  return state.fec;
})(fec);
