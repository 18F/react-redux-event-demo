import { expect } from "chai";
import { spy, stub } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

describe("set candidate name event handler", () => {
  let fixture;
  let dispatch;
  const candidateName = "My Name";
  let setCandidateNameActionCreatorStub;

  beforeEach(() => {
    dispatch = spy();
    setCandidateNameActionCreatorStub = stub();

    fixture = proxyquire("../../main/handlers/setCandidateName", {
      "../reduxStore": {
        dispatch: dispatch
      },
      "../actionCreators/setCandidateName": setCandidateNameActionCreatorStub
    }).default;
  });
  
  it("dispatches set candidate name action to store ", () => {
    const setCandidateNameAction = { action: "here" };
    setCandidateNameActionCreatorStub.withArgs(candidateName).returns(setCandidateNameAction);

    fixture(candidateName);

    expect(dispatch.calledOnce).to.be.true;
    expect(dispatch.calledWith(setCandidateNameAction)).to.be.true;
  });

});
