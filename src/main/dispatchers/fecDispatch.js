import setApiKeyHandler from "../handlers/setApiKey";
import setCandidateNameHandler from "../handlers/setCandidateName";
import findCandidatesWithNameLikeHandler from "../handlers/findCandidatesWithNameLike";

export default (state, event) => {
  setApiKeyHandler(state, event);
  setCandidateNameHandler(state, event);
  findCandidatesWithNameLikeHandler(state, event);
};
