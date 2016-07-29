import { expect } from "chai";
import { spy } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

const emptyPlaceholderDependency = { };

describe("fecDispatch", () => {
  describe("set api key", () => {
    let fixture;
    const setApiKeyType = "set api key type";
    const apiKey = "f8hlsisrjfo9j938hlrlii";
    let setApiKeyHandler;
    
    beforeEach(() => {
      setApiKeyHandler = spy();
      fixture = proxyquire("../../main/dispatchers/fecDispatch", {
        "../eventCreators/setApiKey": {
          type: setApiKeyType
        },
        "../handlers/setApiKey": setApiKeyHandler,
        "../handlers/setCandidateName": emptyPlaceholderDependency,
        "../handlers/findCandidatesWithNameLike": emptyPlaceholderDependency
      }).default;
    });

    it("triggers the set api key handler", () => {
      fixture({
        type: setApiKeyType,
        apiKey: apiKey
      });
      expect(setApiKeyHandler.calledWith(apiKey)).to.be.true;
    });

    it("ignores events it doesn't care about", () => {
      fixture({
        type: "831jr8fjworfgh8th",
        apiKey: apiKey
      });
      expect(setApiKeyHandler.called).to.be.false;
    });
  });

  describe("set candidate name", () => {
    let fixture;
    const setCandidateNameType = "set candidate name type";
    const candidateName = "L. Jones";
    let setCandidateNameHandler;
    
    beforeEach(() => {
      setCandidateNameHandler = spy();
      fixture = proxyquire("../../main/dispatchers/fecDispatch", {
        "../eventCreators/setCandidateName": {
          type: setCandidateNameType
        },
        "../handlers/setCandidateName": setCandidateNameHandler,
        "../handlers/setApiKey": emptyPlaceholderDependency,
        "../handlers/findCandidatesWithNameLike": emptyPlaceholderDependency

      }).default;
    });

    it("triggers the set candidate name handler", () => {
      fixture({
        type: setCandidateNameType,
        name: candidateName
      });
      expect(setCandidateNameHandler.calledWith(candidateName)).to.be.true;
    });

    it("ignores events it doesn't care about", () => {
      fixture({
        type: "831jr8fjworfgh8th",
        name: candidateName
      });
      expect(setCandidateNameHandler.called).to.be.false;
    });
  });

  describe("dispatches to the find candidates with name like handler", () => {
    let fixture;
    const findCandidatesWithNameLikeEventType = "ligrkusrgkuhkurghrhg";
    const findCandidatesWithNameLikeEventHandler = spy();
    
    beforeEach(() => {
      fixture = proxyquire("../../main/dispatchers/fecDispatch", {
        "../eventCreators/findCandidatesWithNameLike": {
          type: findCandidatesWithNameLikeEventType
        },
        "../handlers/findCandidatesWithNameLike": findCandidatesWithNameLikeEventHandler,
        "../handlers/setApiKey": emptyPlaceholderDependency,
        "../handlers/setCandidateName": emptyPlaceholderDependency
      }).default;
    });

    it("maps a hit api event to the hit api handler", () => {
     
      fixture({
        type: findCandidatesWithNameLikeEventType
      });

      expect(findCandidatesWithNameLikeEventHandler.calledOnce).to.be.true;
    });
  });
});