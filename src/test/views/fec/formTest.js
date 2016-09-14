import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { spy, stub } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

describe("fec form view", () => {
  let Fixture;
  let dispatchEvent;
  let createSetApiKeyEvent;
  let createSetCandidateNameEvent;
  let preventDefault;
  
  const findCandidatesWithNameLikeEvent = {
    type: "find the candidates matching what you have on hand"
  };
  
  const createFindCandidatesWithNameLikeEvent = () => { return findCandidatesWithNameLikeEvent; };
  
  beforeEach(() => {
    dispatchEvent = spy();
    createSetApiKeyEvent = stub();
    createSetCandidateNameEvent = stub();
    preventDefault = spy();
    
    Fixture = proxyquire("../../../main/views/fec/form", {
      "../../dispatchEvent": dispatchEvent,
      "../../eventCreators/setApiKey": createSetApiKeyEvent,
      "../../eventCreators/setCandidateName": createSetCandidateNameEvent,
      "../../eventCreators/findCandidatesWithNameLike": createFindCandidatesWithNameLikeEvent
    }).default;
  });

  it("triggers a set api key event with the value on key up, no values set", () => {
    const newApiKey = "k3uvh7ieund78y489fjfny2489juysf9wipol";
    const setApiKeyEvent = { "Hello": "person reading this code" };
    createSetApiKeyEvent.withArgs(newApiKey).returns(setApiKeyEvent);
    const reactWrapper = shallow(<Fixture />);

    reactWrapper.find("#apiKey").simulate("keyUp", { target: { value: newApiKey }});

    expect(dispatchEvent.calledOnce).to.be.true;
    expect(dispatchEvent.calledWith(setApiKeyEvent)).to.be.true;
  });

  it("populates the api key input with the api key property", () => {
    const existingApiKey = "k3uvh7ieund78y489fjfny2489juysf9wipol";

    const reactWrapper = shallow(<Fixture apiKey={ existingApiKey }/>);

    expect(reactWrapper.find("#apiKey").prop("defaultValue")).to.equal(existingApiKey);
  });
  
  it("triggers a set candidate name event with the value on key up, no values set", () => {
    const newCandidateName = "";
    const setCandidateNameEvent = { "Hello": "person reading this code" };
    createSetCandidateNameEvent.withArgs(newCandidateName).returns(setCandidateNameEvent);
    const reactWrapper = shallow(<Fixture />);

    reactWrapper.find("#candidateName").simulate("keyUp", { target: { value: newCandidateName }});

    expect(dispatchEvent.calledOnce).to.be.true;
    expect(dispatchEvent.calledWith(setCandidateNameEvent)).to.be.true;
  });
  
  it("populates the candidate name input with the api key property", () => {
    const existingCandidateName = "Hi Worldly World";

    const reactWrapper = shallow(<Fixture name={ existingCandidateName }/>);

    expect(reactWrapper.find("#candidateName").prop("defaultValue")).to.equal(existingCandidateName);
  });

  it("triggers a find candidates with name like event and doesn't submit the form", () => {
    const reactWrapper = shallow(<Fixture />);

    reactWrapper.find("button").simulate("click", { preventDefault: preventDefault });

    expect(dispatchEvent.calledOnce).to.be.true;
    expect(dispatchEvent.calledWith(findCandidatesWithNameLikeEvent)).to.be.true;
    expect(preventDefault.calledOnce).to.be.true;
  });
  
});
