import React from "react";

import Candidates from "./candidates";
import Form from "./form";

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
    return <Candidates candidates={ candidates }/>;
  }
};

export default fec;
