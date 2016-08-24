import FindCandidatesWithNameLikeHandler from "./handlers/findCandidatesWithNameLike";
import IncrementHandler from "./handlers/increment";
import SetApiKeyHandler from "./handlers/setApiKey";
import SetCandidateNameHandler from "./handlers/setCandidateName";

const handlers = [
  new FindCandidatesWithNameLikeHandler(),
  new IncrementHandler(),
  new SetApiKeyHandler(),
  new SetCandidateNameHandler()
];

export { handlers as default };
