import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { spy } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

const setApiKeyType = "set api key type";
const setCandidateNameType = "set candidate name type";
const setCandidatesType = "set api results type";

describe("hello view", () => {
  let Fixture;
  
  let dispatchEvent;
  const sampleIncrementEvent = {
    myEvent: "is your event"
  };
  
  const incrementEvent = () => { return sampleIncrementEvent; };
  
  beforeEach(() => {
    dispatchEvent = spy();
    Fixture = proxyquire("../../../main/views/hello/hello", {
      "../../dispatchEvent": dispatchEvent,
      "../../eventCreators/increment": incrementEvent
    }).default;
  });

  it("transmits an increment event when the button is clicked", () => {
    const reactWrapper = shallow(<Fixture />);

    reactWrapper.find("button").simulate("click");

    expect(dispatchEvent.calledWith(sampleIncrementEvent)).to.be.true;
    expect(dispatchEvent.calledOnce).to.be.true;
  });

  it("displays a count property somewhere", () => {
    const count = 377494767456;
    const reactWrapper = shallow(<Fixture count={ count } />);

    expect(reactWrapper.containsMatchingElement(count)).to.be.true;
  });
});
