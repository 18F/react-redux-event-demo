import { expect } from "chai";
import { spy } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

describe("helloDispatch", () => {
  let fixture;
  let incrementHandler;

  const state = {
    "friendly": "reminder"
  };
  
  beforeEach(() => {
    incrementHandler = spy();
    fixture = proxyquire("../../main/dispatchers/helloDispatch", {
      "../handlers/increment": incrementHandler
    }).default;
  });
  
  it("routes to increment handler", () => {
    const event = { type: "anything" };
    
    fixture(state, event);
    
    expect(incrementHandler.calledWith(state, event)).to.be.true;
  });
});
