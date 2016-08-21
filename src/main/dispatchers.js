import findCandidatesWithNameLikeHandler from "./handlers/findCandidatesWithNameLike";
import incrementHandler from "./handlers/increment";
import setApiKeyHandler from "./handlers/setApiKey";
import setCandidateNameHandler from "./handlers/setCandidateName";

const handlers = [
  findCandidatesWithNameLikeHandler,
  incrementHandler,
  setApiKeyHandler,
  setCandidateNameHandler
];

export { handlers as default };
