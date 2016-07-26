import React from "react";
import { connect } from "react-redux";

import Results from "./fecResults";
import Form from "./fecForm";

const fec = (props) => {
  return (
    <div>
      { emitForm() }
      { emitResults() }
    </div>
  );
};

const emitForm = (props) => {
  return <Form apiKey={ props.apiKey }/>;
};

const emitResults = (props) => {
  const hasResults = props.hasResults;

  if (hasResults) {
    return <Results results={ props.results }/>;
  }
};

export default connect(state => {
  return {
    fec: state.fec
  };
})(fec);
