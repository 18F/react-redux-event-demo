import { type as setApiKeyType } from "../eventCreators/setApiKey";
import { type as setCandidateNameType } from "../eventCreators/setCandidateName";
import { type as findCandidatesWithNameLikeType } from "../eventCreators/findCandidatesWithNameLike";
import setApiKeyHandler from "../handlers/setApiKey";
import setCandidateNameHandler from "../handlers/setCandidateName";
import findCandidatesWithNameLikeHandler from "../handlers/findCandidatesWithNameLike";

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
  case findCandidatesWithNameLikeType:
    findCandidatesWithNameLikeHandler();
    break;
  }
};
