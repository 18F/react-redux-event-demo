import { expect } from "chai";
import { spy } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

describe("fecDispatch", () => {
  let fixture;
  let setApiKeyHandler;
  let setCandidateNameHandler;
  let findCandidatesWithNameLikeEventHandler;

  beforeEach(() => {
    setApiKeyHandler = spy();
    setCandidateNameHandler = spy();
    findCandidatesWithNameLikeEventHandler = spy();
    fixture = proxyquire("../../main/dispatchers/fecDispatch", {
      "../handlers/setApiKey": setApiKeyHandler,
      "../handlers/setCandidateName": setCandidateNameHandler,
      "../handlers/findCandidatesWithNameLike": findCandidatesWithNameLikeEventHandler
    }).default;
  });

  it("routes to setApiKeyHandler, setCandidateName, and findCandidatesWithNameLike", () => {
    const state = {
      "existing": "state"
    };
    
    const event = {
      type: "some event type",
      word: "up"
    };

    fixture(state, event);

    expect(setApiKeyHandler.calledWith(state, event)).to.be.true;
    expect(setCandidateNameHandler.calledWith(state, event)).to.be.true;
    expect(findCandidatesWithNameLikeEventHandler.calledWith(state, event)).to.be.true;
  });  
});
