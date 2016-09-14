import React from "react";

import dispatchEvent from "../../dispatchEvent";
import setApiKey from "../../eventCreators/setApiKey";
import setCandidateName from "../../eventCreators/setCandidateName";
import findCandidatesWithNameLike from "../../eventCreators/findCandidatesWithNameLike";

const onKeyUpSetApiKey = (event) => {
  const apiKey = event.target.value;
  dispatchEvent(setApiKey(apiKey));
};

const onKeyUpSetCandidateName = (event) => {
  const candidateName = event.target.value;
  dispatchEvent(setCandidateName(candidateName));
};


const triggerFindCandidatesWithNameLike = (event) => {
  dispatchEvent(findCandidatesWithNameLike());
  event.preventDefault();
};

const fecForm = ({ apiKey, name }) => {
  return (
    <form>
      <label htmlFor="apiKey">API key</label>
      <input name="apiKey" id="apiKey" type="text" defaultValue={ apiKey }
             onKeyUp={ onKeyUpSetApiKey }/>
      <label htmlFor="candidateName">candidate name</label>
      <input name="candidateName" id="candidateName" type="text"
             defaultValue={ name } onKeyUp={ onKeyUpSetCandidateName }/>
      <button onClick={ triggerFindCandidatesWithNameLike }>search</button>
    </form>
  );
};

export default fecForm;
