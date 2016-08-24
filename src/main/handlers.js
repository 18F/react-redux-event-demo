import FindCandidatesWithNameLikeHandler from "./handlers/findCandidatesWithNameLike";
import IncrementHandler from "./handlers/increment";
import SetApiKeyHandler from "./handlers/setApiKey";
import SetCandidateNameHandler from "./handlers/setCandidateName";

const handlers = [
  FindCandidatesWithNameLikeHandler,
  IncrementHandler,
  SetApiKeyHandler,
  SetCandidateNameHandler
];

export { handlers as default };
