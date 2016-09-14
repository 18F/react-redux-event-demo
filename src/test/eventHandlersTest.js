import { expect } from "chai";
import proxyquire from "proxyquire";

proxyquire.noCallThru();

describe("maps handlers", () => {
  let fixture;
  
  const findCandidatesWithNameLikeHandler = "fcwnlh";
  const incrementHandler = "ih";
  const setApiKeyHandler = "sapikh";
  const setCandidateNameHandler = "scnh";

  const findCandidatesWithNameLikeType = "fcwnlt";
  const incrementType = "it";
  const setApiKeyType = "sakt";
  const setCandidateNameType = "scnt";
  
  beforeEach(() => {
    fixture = proxyquire("../main/eventHandlers", {
      "./eventHandlers/findCandidatesWithNameLike": findCandidatesWithNameLikeHandler,
      "./eventHandlers/increment": incrementHandler,
      "./eventHandlers/setApiKey": setApiKeyHandler,
      "./eventHandlers/setCandidateName": setCandidateNameHandler,
      "./eventCreators/findCandidatesWithNameLike": {
        type: findCandidatesWithNameLikeType
      },
      "./eventCreators/increment": {
        type: incrementType
      },
      "./eventCreators/setApiKey": {
        type: setApiKeyType
      },
      "./eventCreators/setCandidateName": {
        type: setCandidateNameType
      }
    }).default;
  });
  
  it("maps findCandidatesWithNameLike handler", () => {
    expect(fixture[findCandidatesWithNameLikeType]).to.deep.equal([findCandidatesWithNameLikeHandler]);
  });

  it("maps increment handler", () => {
    expect(fixture[incrementType]).to.deep.equal([incrementHandler]);
  });

  it("maps setApiKey handler", () => {
    expect(fixture[setApiKeyType]).to.deep.equal([setApiKeyHandler]);
  });

  it("maps setCandidateName handler", () => {
    expect(fixture[setCandidateNameType]).to.deep.equal([setCandidateNameHandler]);
  });

});
