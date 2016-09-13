import findCandidatesWithNameLikeHandler from "./handlers/findCandidatesWithNameLike";
import incrementHandler from "./handlers/increment";
import setApiKeyHandler from "./handlers/setApiKey";
import setCandidateNameHandler from "./handlers/setCandidateName";

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
