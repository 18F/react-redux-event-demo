import React from "react";

const fecForm = (props) => {
  return (
    <form>
      <label htmlFor="apiKey"/>
      <input id="apiKey" defaultValue={ props.apiKey } />
    </form>
  );
};

export default fecForm;
