import { expect } from "chai";
import { stub } from "sinon";
import proxyquire from "proxyquire";

proxyquire.noCallThru();

describe("set candidate name event handler", () => {
  let fixture;
  let dispatch;
  let setCandidateNameActionCreator;

  const setCandidateNameType = "candidate name type here";
  const candidateName = "My Name";
  
  beforeEach(() => {
    dispatch = stub();
    setCandidateNameActionCreator = stub();

    fixture = proxyquire("../../main/eventHandlers/setCandidateName", {
      "../actionCreators/setCandidateName": setCandidateNameActionCreator
    }).default;
  });
  
  it("dispatches set candidate name action to store when given a compatible event", () => {
    const event = {
      name: candidateName
    };
    const setCandidateNameAction = { action: "here" };
    const dispatchedAction = { la: "dee da" };
    setCandidateNameActionCreator.withArgs(candidateName).returns(setCandidateNameAction);
    dispatch.withArgs(setCandidateNameAction).returns(dispatchedAction);

    const actual = fixture({ dispatch, event });

    expect(actual).to.equal(dispatchedAction);
  });
});
