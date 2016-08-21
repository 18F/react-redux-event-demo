import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { spy, stub } from "sinon";
import proxyquire from "proxyquire";

proxyquire.noCallThru();
chai.use(chaiAsPromised);

describe("set candidate name event handler", () => {
  let fixture;
  let dispatch;
  const setCandidateNameType = "candidate name type here";
  const candidateName = "My Name";
  let setCandidateNameActionCreatorStub;
  const state = {
    "world": "told me hello the other day"
  };
  
  beforeEach(() => {
    dispatch = spy();
    setCandidateNameActionCreatorStub = stub();

    fixture = proxyquire("../../main/handlers/setCandidateName", {
      "../reduxStore": {
        dispatch: dispatch
      },
      "../eventCreators/setCandidateName": {
        type: setCandidateNameType
      },
      "../actionCreators/setCandidateName": setCandidateNameActionCreatorStub
    }).default;
  });
  
  it("dispatches set candidate name action to store ", () => {
    const event = {
      type: setCandidateNameType,
      name: candidateName
    };
    const setCandidateNameAction = { action: "here" };
    setCandidateNameActionCreatorStub.withArgs(candidateName).returns(setCandidateNameAction);
    
    const actual = fixture(state, event);

    expect(dispatch.calledOnce).to.be.true;
    expect(dispatch.calledWith(setCandidateNameAction)).to.be.true;
    expect(actual).to.eventually.equal(setCandidateNameAction);
  });

  it("ignores irrelevant events", () => {
    const event = {
      type: setCandidateNameType + "some other string",
      name: "Inigo Montoya"
    };

    const actual = fixture(state, event);

    expect(actual).to.eventually.equal("no-op");
  });

});
