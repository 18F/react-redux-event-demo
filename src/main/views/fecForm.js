import React from "react";

import eventDispatch from "../eventDispatch";
import setApiKey from "../eventCreators/setApiKey";
import setCandidateName from "../eventCreators/setCandidateName";

const onKeyUpSetApiKey = (event) => {
  const apiKey = event.target.value;
  eventDispatch(setApiKey(apiKey));
};

const onKeyUpSetCandidateName = (event) => {
  const candidateName = event.target.value;
  eventDispatch(setCandidateName(candidateName));
};


const hitApi = (event) => {
  event.preventDefault();
};

const fecForm = (props) => {
  return (
    <form>
      <label htmlFor="apiKey">API key</label>
      <input name="apiKey" id="apiKey" type="text" defaultValue={ props.apiKey }
             onKeyUp={ onKeyUpSetApiKey }/>
      <label htmlFor="candidateName">candidate name</label>
      <input name="candidateName" id="candidateName" type="text"
             defaultValue={ props.name } onKeyUp={ onKeyUpSetCandidateName }/>
      <button onClick={ hitApi }>trigger request</button>
    </form>
  );
};

export default fecForm;
