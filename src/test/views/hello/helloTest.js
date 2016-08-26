import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { spy } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

const setApiKeyType = "set api key type";
const setCandidateNameType = "set candidate name type";
const setCandidatesType = "set api results type";

describe("candidates view", () => {
  let Fixture;
  
  let eventDispatch;
  const sampleIncrementEvent = {
    myEvent: "is your event"
  };
  
  const incrementEvent = () => { return sampleIncrementEvent; };
  
  beforeEach(() => {
    eventDispatch = spy();
    Fixture = proxyquire("../../../main/views/hello/hello", {
      "../../eventDispatch": eventDispatch,
      "../../eventCreators/increment": incrementEvent
    }).default;
  });

  it("transmits an increment event when the button is clicked", () => {
    const reactWrapper = shallow(<Fixture />);

    reactWrapper.find("button").simulate("click");

    expect(eventDispatch.calledWith(sampleIncrementEvent)).to.be.true;
    expect(eventDispatch.calledOnce).to.be.true;
  });

  it("displays a count property somewhere", () => {
    const count = 377494767456;
    const reactWrapper = shallow(<Fixture count={ count } />);

    expect(reactWrapper.containsMatchingElement(count)).to.be.true;
  });
});
