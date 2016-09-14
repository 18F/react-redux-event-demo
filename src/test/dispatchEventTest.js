import { expect } from "chai";
import { spy, stub } from "sinon";
import proxyquire from "proxyquire";
proxyquire.noCallThru();

describe("dispatchEvent", () => {
  let fixture;
  
  let getState;
  let getDispatchForHandlers;
  let generatedDispatchEvent;
  
  beforeEach(() => {
    getState = spy();

    getDispatchForHandlers = stub();
    generatedDispatchEvent = spy();
    
    const handlers = {
      type1: [ () => { } ],
      type2: [ () => { } ],
      type3: [ () => { }, () => { } ]
    };

    getDispatchForHandlers.withArgs(handlers, getState).returns(generatedDispatchEvent);
    
    fixture = proxyquire("../main/dispatchEvent", {
      "./handlers": handlers,
      "./handler": {
        getDispatchForHandlers: getDispatchForHandlers
      },
      "./reduxStore": {
        getState: getState
      }
    }).default;
  });
  
  it("presents events to registered handlers", () => {
    const event = { type: "hello", value: "world" };

    fixture(event);

    expect(generatedDispatchEvent.calledOnce).to.be.true;
    expect(generatedDispatchEvent.calledWith(event)).to.be.true;
  });
});
