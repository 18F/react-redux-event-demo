import { type as setApiKeyType } from "../eventCreators/setApiKey";
import { type as setCandidateNameType } from "../eventCreators/setCandidateName";
import setApiKeyHandler from "../handlers/setApiKey";
import setCandidateNameHandler from "../handlers/setCandidateName";

export default (event) => {
  switch (event.type) {
  case setApiKeyType:
    const apiKey = event.apiKey;
    setApiKeyHandler(apiKey);
    break;
  case setCandidateNameType:
    const name = event.name;
    setCandidateNameHandler(name);
    break;
  }
};
