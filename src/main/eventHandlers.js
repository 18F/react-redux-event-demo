import findCandidatesWithNameLikeHandler from "./eventHandlers/findCandidatesWithNameLike";
import incrementHandler from "./eventHandlers/increment";
import setApiKeyHandler from "./eventHandlers/setApiKey";
import setCandidateNameHandler from "./eventHandlers/setCandidateName";

import { type as findCandidatesWithNameLikeType } from "./eventCreators/findCandidatesWithNameLike";
import { type as incrementType } from "./eventCreators/increment";
import { type as setApiKeyType } from "./eventCreators/setApiKey";
import { type as setCandidateNameType } from "./eventCreators/setCandidateName";


const handlers = {
  [ findCandidatesWithNameLikeType ]: [ findCandidatesWithNameLikeHandler ],
  [ incrementType ]: [ incrementHandler ],
  [ setApiKeyType ]: [ setApiKeyHandler ],
  [ setCandidateNameType ]: [ setCandidateNameHandler ]
};

export { handlers as default };
